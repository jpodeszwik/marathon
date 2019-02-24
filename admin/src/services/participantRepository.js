import { subscribeForParticipants } from 'marathon-lib/src/participants';

const participants = {};

subscribeForParticipants(newParticipants => {
  newParticipants
    .forEach(participant => participants[participant.id] = participant);
});

export const getParticipant = id => participants[id];
