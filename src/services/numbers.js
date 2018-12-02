import moment from 'moment';
import firebase from './firebase';

const format = date => moment(date).format('DD MMM HH:mm');

const roundRef = round => firebase.database().ref(`rounds/${format(round)}`);

const numberRef = (round, number) => roundRef(round).child(number);

const pushNumber = (round, number) => numberRef(round, number).set(1);

const removeNumber = (round, number) => numberRef(round, number).set(0);

const readNumbers = round =>
  roundRef(round).once('value').then((snapshot) => {
    const val = snapshot.val();
    if (val === null) {
      return [];
    }
    return Object.keys(val)
      .filter(key => val[key] === 1);
  });

export { pushNumber, removeNumber, readNumbers };
