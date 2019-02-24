import firebase from 'marathon-lib/src/firebase';
import { listAllParticipantsInRound } from 'marathon-lib/src/fights';
import { getParticipant } from './participantRepository';

export const registerParticipant = (userData) => {
  const uid = firebase.auth().currentUser.uid;
  const registrationRef = firebase.database().ref(`commands/register/${uid}`);
  const key = registrationRef.push(userData).key;
  const participantRef = firebase.database().ref(`participants/${key}/id`);
  return new Promise(resolve => {
    participantRef.on('value', function (snapshot) {
      if (!snapshot.exists()) {
        return;
      }

      resolve(snapshot.val());
      participantRef.off('value', this);
    });
  });
};

export const subscribeForListUsers = callback => {
  return firebase.database().ref('users').on('value', snapshot => {
    const val = snapshot.val();
    const keys = Object.keys(val);
    const userList = keys.map(key => ({ id: key, ...val[key] }));
    callback(userList);
  });
};

export const unsubscribeFromListUsers = listener => {
  return firebase.database().ref('users').off('value', listener);
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
          fights: val[participantId].totalFights || 0,
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

export const listFighters = listAllParticipantsInRound;
