import moment from 'moment';
import firebase from './firebase';

const format = date => moment(date).format('DD MMM HH:mm');

const containsFightRegisteredByUser = (round, uid) => round && round[uid];

export const listFights = round => {
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

            return Object.keys(val).filter(key => containsFightRegisteredByUser(val[key][roundKey], uid));
        });
};

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
