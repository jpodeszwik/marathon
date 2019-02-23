import { openDb } from 'idb';
import { changeFight, listParticipantsAddedByCurrentUserInRound } from "marathon-lib/src/fights";

const dbPromise = openDb('marathon-app-db', 1, db => {
  if (!db.objectStoreNames.contains('fight-commands')) {
    db.createObjectStore('fight-commands', { autoIncrement: true });
  }
});

export const pushFight = async (round, personId) => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  return tx.objectStore('fight-commands').put({
    operation: 'add',
    round,
    personId,
  });
};

export const removeFight = async (round, personId) => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  tx.objectStore('fight-commands').put({
    operation: 'remove',
    round,
    personId,
  });
  return tx.complete;
};

const getFirstUnprocessedRecord = async () => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readonly');
  const store = tx.objectStore('fight-commands');
  const cursor = await store.openCursor();

  return cursor ? { primaryKey: cursor.primaryKey, ...cursor.value } : null;
};

export const getUnprocessedCount = async () => {
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  return tx.objectStore('fight-commands').count();
};

const persistFights = async () => {
  const record = await getFirstUnprocessedRecord();
  if (!record) {
    return;
  }

  await changeFight(record);
  const db = await dbPromise;
  const tx = db.transaction('fight-commands', 'readwrite');
  return tx.objectStore('fight-commands').delete(record.primaryKey);
};

setInterval(persistFights, 1000);

export const listFights = listParticipantsAddedByCurrentUserInRound;
