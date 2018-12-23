import firebase from './firebase';
import moment from 'moment';
import 'firebase/database';
import { getParticipant } from './participantRepository';

export function createUser(userData) {
  firebase.database().ref('registrations').push(userData);
}

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
      })
      .filter(participant => participant.data !== undefined);

    const participantsWithPlaces = calculateResults(participants);
    callback(participantsWithPlaces);
  });
}

export function unsubscribeForParticipantsResults(listener) {
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
