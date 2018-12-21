import firebase from './firebase';
import 'firebase/database';

export function createUser(userData) {
  const user = firebase.auth().currentUser;
  firebase.database().ref(`registrations/${user.uid}`).push(userData);
}

export function listUsers() {
  const user = firebase.auth().currentUser;

  return firebase.database().ref(`fighters/${user.uid}`).once('value').then((snapshot) => {
    const val = snapshot.val();

    if (val === null) {
      return [];
    }

    return Object.keys(val)
      .map(key => val[key]);
  }).then(fighters => {
    return firebase.database().ref('ranking').once('value').then((snapshot) => {
      const val = snapshot.val();
      fighters.forEach(fighter => {
        fighter.fights = val[fighter.id] ? val[fighter.id].totalFights : 0;
      });
      return fighters;
    });
  });
}

export function subscribeForUsers(callback) {
  const user = firebase.auth().currentUser;
  return firebase.database().ref(`fighters/${user.uid}`).orderByChild('id').on('value', function (snapshot) {
    const val = snapshot.val();

    if (val === null) {
      return [];
    }

    const users = Object.keys(val)
      .map(key => val[key]);
    callback(users.reverse());
  });
}

export function unsubscribeForUsers(listener) {
  const user = firebase.auth().currentUser;
  firebase.database().ref(`fighters/${user.uid}`).orderByChild('id').off('value', listener);
}
