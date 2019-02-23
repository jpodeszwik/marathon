import moment from 'moment';
import firebase from './firebase';

const format = date => moment(date).format('DD MMM HH:mm');

const containsFightRegisteredByUser = (round, uid) => round && round[uid];
const containsAnyFight = round => round && Object.keys(round).map(key => round[key]).includes(true);

export const listParticipantsAddedByCurrentUserInRound = round => {
    const uid = firebase.auth().currentUser.uid;

    return firebase
        .database()
        .ref(`fights`)
        .once('value')
        .then(snapshot => {
            const roundKey = format(round);
            const val = snapshot.val();
            if (val === null) {
                return [];
            }

            return Object.keys(val)
                .filter(key => containsFightRegisteredByUser(val[key][roundKey], uid));
        });
};

export const listAllParticipantsInRound = round =>
    firebase.database().ref('fights').once('value').then(snapshot => {
        const roundKey = format(round);
        const val = snapshot.val();
        if (val === null) {
            return [];
        }

        return Object.keys(val)
            .filter(key => containsAnyFight(val[key][roundKey]));
    });

export const changeFight = record => {
    const uid = firebase.auth().currentUser.uid;

    const { operation, round, personId } = record;

    return firebase
        .database()
        .ref(`commands/changeFight/${uid}`)
        .push({
            operation,
            participantId: personId,
            round: format(round),
        });
};
