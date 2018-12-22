import firebase from './firebase';
import moment from 'moment';
import 'firebase/database';
import { getParticipant } from './participantRepository';

export function createUser(userData) {
  firebase.database().ref('registrations').push(userData);
}

const topn = (fighters, n) => {
  const copyFighters = fighters.slice();
  copyFighters.sort((a, b) => b.fights - a.fights);
  const nthFighter = copyFighters[n - 1] || {};
  const nthValue = nthFighter.fights || 0;
  return copyFighters.filter(fighter => fighter.fights >= nthValue);
};

const calculateResults = (participants) => {
  const copyParticipants = participants.slice();
  copyParticipants.sort((a, b) => b.fights - a.fights);

  return copyParticipants.map((participant, index) => {
    return {
      id: participant.id,
      fights: participant.fights,
      data: participant.data,
      place: index + 1
    };
  });
};

export function subscribeForParticipantsResults(callback) {
  return firebase.database().ref('ranking').on('value', function (snapshot) {
    const val = snapshot.val();
    if (val === null) {
      return [];
    }

    const participants = Object.keys(val)
      .map(participantId => {
        const participant = getParticipant(participantId);
        return {
          id: participantId,
          fights: val[participantId].totalFights,
          data: participant,
        };
      });

    const participantsWithPlaces = calculateResults(participants);
    callback(participantsWithPlaces);
  });
}

export function unsubscribeForParticipantsResults(listener) {
  firebase.database().ref('ranking').off('value', listener);
}

export function subscribeForTop(callback) {
  subscribeForParticipantsResults(function(participants) {
    const top5 = topn(participants, 5);
    const women = participants.filter(participant => participant.data.sex === 'Kobieta');
    const top3women = topn(women, 3);

    callback({ top5, top3women });
  });
}

export function unsubscribeForTop(listener) {
  unsubscribeForParticipantsResults(listener);
}

const format = date => moment(date).format('DD MMM HH:mm');

export const listFighters = round =>
  firebase.database().ref('fights').once('value').then((snapshot) => {
    const roundKey = format(round);
    const val = snapshot.val();

    return Object.keys(val)
      .filter(key => val[key][roundKey] === true);
  });
