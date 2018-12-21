import firebase from './firebase';
import moment from 'moment';
import 'firebase/database';

const fighters = {};

firebase.database().ref('fighters').on('value', snapshot => {
  const val = snapshot.val() || {};
  Object.keys(val)
    .forEach(fighterId => fighters[fighterId] = val[fighterId]);
});

export const getFighterDetails = id => fighters[id];

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

const topn = (fighters, n) => {
  const copyFighters = fighters.slice();
  copyFighters.sort((a, b) => b.fights - a.fights);
  const nthFighter = copyFighters[n - 1] || {};
  const nthValue = nthFighter.fights || 0;
  return copyFighters.filter(fighter => fighter.fights >= nthValue);
};

export function subscribeForTop(callback) {
  return firebase.database().ref('ranking').on('value', function (snapshot) {
    const val = snapshot.val();
    if (val === null) {
      return [];
    }

    const fighters = Object.keys(val)
      .map(fighterId => ({ id: fighterId, fights: val[fighterId].totalFights, fullName: getFighterDetails(fighterId).fullName, sex: getFighterDetails(fighterId).sex }));

    const top5 = topn(fighters, 5);

    const women = fighters.filter(fighter => fighter.sex === 'Kobieta');
    const top3women = topn(women, 3);

    callback({ top5, top3women });
  });
}

export function unsubscribeForTop(listener) {
  firebase.database().ref('ranking').off('value', listener);
}

const format = date => moment(date).format('DD MMM HH:mm');

export const listFighters = round =>
  firebase.database().ref('fights').once('value').then((snapshot) => {
    const roundKey = format(round);
    const val = snapshot.val();

    return Object.keys(val)
      .filter(key => val[key][roundKey] === true);
  });
