import { subscribeForParticipantsResults, unsubscribeForParticipantsResults } from '../../services/users';

const topn = (participants, n) => {
  const copyParticipants = participants.slice();
  copyParticipants.sort((a, b) => b.fights - a.fights);
  const nthFighter = copyParticipants[n - 1] || {};
  const nthValue = nthFighter.fights || 0;
  return copyParticipants.filter(participant => participant.fights >= nthValue);
};

const calculateTotalFights = participants => {
  const totalFights = participants.map(participant => participant.fights).reduce((a, b) => a + b, 0);
  return Math.ceil(totalFights / 2);
};

export const subscribeForResults = callback => {
  return subscribeForParticipantsResults(function (participants) {
    const men = participants.filter(participant => participant.data.sex === 'Mężczyzna')
    const top3men = topn(men, 3);
    const women = participants.filter(participant => participant.data.sex === 'Kobieta');
    const top3women = topn(women, 3);
    const totalFights = calculateTotalFights(participants);
    const totalParticipants = participants.length;

    callback({ top3men, top3women, totalFights, totalParticipants });
  });
};

export const unsubscribeFromResults = listener => {
  unsubscribeForParticipantsResults(listener);
};
