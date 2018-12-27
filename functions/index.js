const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.processSignUp = functions.auth.user().onCreate(user => {
  if (!user.email || !user.emailVerified) {
    return null;
  }

  console.log(`registering user: ${user.email}`);
  return admin.database().ref('users').child(user.uid).set({
    email: user.email,
  });
});

exports.sumPersonsFight = functions.database.ref('/fights/{participantId}').onWrite((change, context) => {
  const participantId = context.params.participantId;
  const fights = change.after.val();
  const totalFights = Object.keys(fights).filter(fight => fights[fight] === true).length;

  console.log(`person: ${participantId}, totalFights: ${totalFights}`);
  return admin.database().ref(`/ranking/${participantId}/totalFights`).set(totalFights);
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

  console.log(`registering participant: ${participantId}, created by user: ${userId}`);

  return getNextParticipantId()
    .then(id => {
      console.log(`assigned id: ${id} to participant: ${participantId}`);
      participant.id = id;
      participant.registeredBy = userId;

      return Promise.all(
        admin.database().ref(`/participants/${participantId}`).set(participant),
        admin.database().ref(`/ranking/${id}/firstName`).set(firstName)
      );
    });
});
