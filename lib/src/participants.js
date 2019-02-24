import firebase from './firebase';

const sortedParticipantsRef = firebase.database().ref('participants').orderByChild('id');

export const subscribeForParticipants = callback => {
    const listener = sortedParticipantsRef.on('value', function (snapshot) {
        const val = snapshot.val() || {};
        const participants = Object.keys(val)
            .map(key => val[key]);

        callback(participants.reverse());
    });

    return () => sortedParticipantsRef.off('value', listener);
};
