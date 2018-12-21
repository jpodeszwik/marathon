import moment from 'moment';
import firebase from './firebase';

const format = date => moment(date).format('DD MMM HH:mm');

const fightRef = (round, personId) => firebase.database().ref(`fights/${personId}/${format(round)}`);

const pushFight = (round, personId) => fightRef(round, personId).set(true);

const removeFight = (round, personId) => fightRef(round, personId).set(false);

const listFights = round =>
  firebase.database().ref('fights').once('value').then((snapshot) => {
    const roundKey = format(round);
    const val = snapshot.val();

    return Object.keys(val)
      .filter(key => val[key][roundKey] === true);
  });

export { pushFight, removeFight, listFights };
