import firebase from './firebase';

const participants = {};
const sortedParticipantsRef = firebase.database().ref('fighters').orderByChild('id');

export const subscribeForParticipants = callback =>
  sortedParticipantsRef.on('value', function (snapshot) {
    const val = snapshot.val() || {};
    const users = Object.keys(val)
      .map(key => val[key]);

    callback(users.reverse());
  });

export const unsubscribeForParticipants = listener =>
  sortedParticipantsRef.off('value', listener);

subscribeForParticipants(newParticipants => {
  newParticipants
    .forEach(participant => participants[participant.id] = participant);
});

export const getParticipant = id => participants[id];
