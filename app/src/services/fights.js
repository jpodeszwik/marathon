import moment from 'moment';
import { openDb } from 'idb';
import firebase from './firebase';

const dbPromise = openDb('marathon-app-db', 1, (db) => {
  if (!db.objectStoreNames.contains('fight-commands')) {
    const fightCommands = db.createObjectStore('fight-commands', { autoIncrement: true });
    fightCommands.createIndex('processed', 'processed');
  }
});

const format = date => moment(date).format('DD MMM HH:mm');

const fightRef = (round, personId) => firebase.database().ref(`fights/${personId}/${format(round)}`);

const pushFight = async (round, personId) => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  return tx.objectStore('fight-commands').put({
    processed: 'false', operation: 'add', round, personId,
  });
};

const removeFight = async (round, personId) => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  tx.objectStore('fight-commands').put({
    processed: 'false', operation: 'remove', round, personId,
  });
  return tx.complete;
};

const listFights = round =>
  firebase.database().ref('fights').once('value').then((snapshot) => {
    const roundKey = format(round);
    const val = snapshot.val();

    return Object.keys(val)
      .filter(key => val[key][roundKey] === true);
  });

const getFirstUnprocessedRecord = async () => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readonly');
  const store = tx.objectStore('fight-commands');
  const cursor = await store.index('processed').openCursor(IDBKeyRange.only('false'));

  return cursor ? { primaryKey: cursor.primaryKey, ...cursor.value } : null;
};

const performOperation = (record) => {
  const {
    operation, round, personId,
  } = record;
  if (operation === 'add') {
    return fightRef(round, personId).set(true);
  }
  return fightRef(round, personId).set(false);
};

const persistFights = async () => {
  const record = await getFirstUnprocessedRecord();
  if (!record) {
    return;
  }

  performOperation(record).then(async () => {
    const db = await dbPromise;
    const tx = db.transaction('fight-commands', 'readwrite');
    return tx.objectStore('fight-commands').put({ processed: 'true' }, record.primaryKey);
  });
};

setInterval(persistFights, 1000);


export { pushFight, removeFight, listFights };
