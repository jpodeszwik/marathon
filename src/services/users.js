import firebase from './firebase';
import 'firebase/database';

export function createUser(userData) {
  firebase.database().ref('registrations').push(userData);
}

export function subscribeForUsers(callback) {
  return firebase.database().ref('fighters').orderByChild('id').on('value', function (snapshot) {
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
  firebase.database().ref('fighters').orderByChild('id').off('value', listener);
}
