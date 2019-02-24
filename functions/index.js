const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.processSignUp = functions.auth.user().onCreate(user => {
    if (!user.email || !user.emailVerified) {
        return null;
    }

    console.log(`registering user: ${user.uid}, with email: ${user.email}`);
    return admin.database().ref('users').child(user.uid).set({
        email: user.email,
    });
});

exports.sumPersonsFight = functions.database.ref('/fights/{participantId}').onWrite((change, context) => {
    const participantId = context.params.participantId;
    const rounds = change.after.val() || {};

    return admin.database().ref('/metadata/boundaries').once('value')
        .then(snapshot => snapshot.val())
        .then(boundaries => {
            const {start, end} = boundaries;
            const totalFights = Object.keys(rounds)
                .filter(round => Object.keys(rounds[round]).map(user => rounds[round][user]).includes(true))
                .filter(round => round.localeCompare(start) >= 0)
                .filter(round => round.localeCompare(end) < 0)
                .length;

            console.log(`setting persons: ${participantId} fights to: ${totalFights}`);
            return admin.database().ref(`/ranking/${participantId}/totalFights`).set(totalFights);
        });
});

exports.changeFights = functions.database.ref('/commands/changeFight/{userId}/{commandId}').onWrite((change, context) => {
    if (change.before.exists()) {
        return null;
    }

    const {userId} = context.params;
    const {operation, participantId, round} = change.after.val();

    console.log(`registering participant: ${participantId} round: ${round} operation: ${operation}, created by user: ${userId}`);

    return admin.database().ref(`/fights/${participantId}/${round}/${userId}`).set(operation === 'add');
});

const getNextParticipantId = () => admin.database()
    .ref('/metadata/lastParticipantId')
    .transaction(counter => counter ? counter + 1 : 1)
    .then(transactionResult => transactionResult.snapshot.val());

exports.registerParticipant = functions.https.onCall((participant, context) => {
    const userId = context.auth.uid;

    const fullName = participant.fullName || 'unknown';
    const firstName = fullName.split(' ')[0] || 'unknown';
    const homeClub = participant.homeClub || 'unknown';
    const sex = participant.sex || 'unknown';

    return admin.database().ref(`users/${userId}/registerParticipants`).once('value')
        .then(snapshot => snapshot.val())
        .then(canRegister => {
            if (!canRegister) {
                throw new functions.https.HttpsError('failed-precondition', 'User must have permission to register participant');
            }
            return null;
        })
        .then(() => getNextParticipantId())
        .then(id => {
            console.log(`registering participant with ${id} by user ${userId}`);
            participant.id = id;
            participant.registeredBy = userId;

            return Promise.all([
                id,
                admin.database().ref(`/participants/${id}`).set(participant),
                admin.database().ref(`/ranking/${id}/firstName`).set(firstName),
                admin.database().ref(`/ranking/${id}/homeClub`).set(homeClub),
                admin.database().ref(`/ranking/${id}/sex`).set(sex)
            ]);
        })
        .then(val => val[0]);
});
