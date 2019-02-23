import moment from 'moment';
import { openDb } from 'idb';
import firebase from './firebase';

const dbPromise = openDb('marathon-app-db', 1, db => {
  if (!db.objectStoreNames.contains('fight-commands')) {
    db.createObjectStore('fight-commands', { autoIncrement: true });
  }
});

const format = date => moment(date).format('DD MMM HH:mm');

const pushFight = async (round, personId) => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  return tx.objectStore('fight-commands').put({
    operation: 'add',
    round,
    personId,
  });
};

const removeFight = async (round, personId) => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  tx.objectStore('fight-commands').put({
    operation: 'remove',
    round,
    personId,
  });
  return tx.complete;
};

const containsFightRegisteredByUser = (round, uid) => round && round[uid];

const listFights = round => {
  const uid = firebase.auth().currentUser.uid;

  return firebase
      .database()
      .ref(`fights`)
      .once('value')
      .then(snapshot => {
        const roundKey = format(round);
        const val = snapshot.val();
        if (val === null) {
          return [];
        }

        return Object.keys(val).filter(key => containsFightRegisteredByUser(val[key][roundKey], uid));
      });
};

const getFirstUnprocessedRecord = async () => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readonly');
  const store = tx.objectStore('fight-commands');
  const cursor = await store.openCursor();

  return cursor ? { primaryKey: cursor.primaryKey, ...cursor.value } : null;
};

const performOperation = record => {
  const uid = firebase.auth().currentUser.uid;

  const { operation, round, personId } = record;

  return firebase
    .database()
    .ref(`commands/changeFight/${uid}`)
    .push({
      operation,
      participantId: personId,
      round: format(round),
    });
};

const getUnprocessedCount = async () => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  return tx.objectStore('fight-commands').count();
};

const persistFights = async () => {
  const record = await getFirstUnprocessedRecord();
  if (!record) {
    return;
  }

  performOperation(record).then(async () => {
    const db = await dbPromise;
    const tx = db.transaction('fight-commands', 'readwrite');
    return tx.objectStore('fight-commands').delete(record.primaryKey);
  });
};

setInterval(persistFights, 1000);

export { pushFight, removeFight, listFights, getUnprocessedCount };
