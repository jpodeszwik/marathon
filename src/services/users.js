import firebase from './firebase';
import moment from 'moment';
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

const format = date => moment(date).format('DD MMM HH:mm');

export const listFighters = round =>
  firebase.database().ref('fights').once('value').then((snapshot) => {
    const roundKey = format(round);
    const val = snapshot.val();

    return Object.keys(val)
      .filter(key => val[key][roundKey] === true);
  });
