import firebase from 'marathon-lib/src/firebase';
import moment from 'moment';
import 'firebase/database';
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

export const getLoggedInUserPermissions = () => {
  const uid = firebase.auth().currentUser.uid;
  return firebase.database().ref(`users/${uid}`).once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const setRegisterFights = (uid, val) => {
  return firebase.database().ref(`users/${uid}/registerFights`).set(val);
};

export const setRegisterParticipants = (uid, val) => {
  return firebase.database().ref(`users/${uid}/registerParticipants`).set(val);
};

export const setManageUsers = (uid, val) => {
  return firebase.database().ref(`users/${uid}/manageUsers`).set(val);
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

const format = date => moment(date).format('DD MMM HH:mm');

export const listFighters = round =>
  firebase.database().ref('fights').once('value').then((snapshot) => {
    const roundKey = format(round);
    const val = snapshot.val();
    if (val === null) {
      return [];
    }

    return Object.keys(val)
      .filter(key => val[key][roundKey] === true);
  });
