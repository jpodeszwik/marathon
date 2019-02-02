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
  const fights = change.after.val() || {};

  return admin.database().ref('/metadata/boundaries').once('value')
      .then(snapshot => snapshot.val())
      .then(boundaries => {
        const {start, end } = boundaries;
        const totalFights = Object.keys(fights)
            .filter(fight => fights[fight] === true)
            .filter(fight => fight.localeCompare(start) >= 0)
            .filter(fight => fight.localeCompare(end) < 0)
            .length;

        console.log(`seting persons: ${participantId} fights to: ${totalFights}`);
        return admin.database().ref(`/ranking/${participantId}/totalFights`).set(totalFights);
      });
});

function getNextParticipantId() {
  return admin.database().ref('/metadata/lastParticipantId').transaction(counter => counter ? counter + 1 : 1)
    .then(transactionResult => transactionResult.snapshot.val());
}

/**
 * Copy registered users into other place in the tree to prevent unauthorized modification.
 * Assign id to newly created participant.
 * Write participant first name to public part of the tree.
 */
exports.registerParticipants = functions.database.ref('/commands/register/{userId}/{participantId}').onWrite((change, context) => {
  if (change.before.exists()) {
    return null;
  }

  const { userId, participantId } = context.params;
  const participant = change.after.val();
  const fullName = participant.fullName || 'unknown';
  const firstName = fullName.split(' ')[0] || 'unknown';
  const homeClub = participant.homeClub || 'unknown';
  const sex = participant.sex || 'unknown';

  console.log(`registering participant: ${participantId}, created by user: ${userId}`);

  return getNextParticipantId()
    .then(id => {
      console.log(`assigned id: ${id} to participant: ${participantId}`);
      participant.id = id;
      participant.registeredBy = userId;

      return Promise.all([
        admin.database().ref(`/participants/${participantId}`).set(participant),
        admin.database().ref(`/ranking/${id}/firstName`).set(firstName),
        admin.database().ref(`/ranking/${id}/homeClub`).set(homeClub),
        admin.database().ref(`/ranking/${id}/sex`).set(sex)
      ]);
    });
});

exports.changeFights = functions.database.ref('/commands/changeFight/{userId}/{commandId}').onWrite((change, context) => {
  if (change.before.exists()) {
    return null;
  }

  const { userId } = context.params;
  const { operation, participantId, round } = change.after.val();

  console.log(`registering participant: ${participantId} round: ${round} operation: ${operation}, created by user: ${userId}`);

  return admin.database().ref(`/fights/${participantId}/${round}`).set(operation === 'add');
});
