import firebase from 'marathon-lib/src/firebase';
import { listAllParticipantsInRound } from 'marathon-lib/src/fights';
import { getParticipant } from './participantRepository';

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
