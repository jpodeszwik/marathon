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

exports.sumPersonsFight = functions.database.ref('/fights/{personId}').onWrite((change, context) => {
  const personId = context.params.personId;
  const fights = change.after.val();
  const totalFights = Object.keys(fights).filter(fight => fights[fight] === true).length;

  console.log(`person: ${context.params.personId}, totalFights: ${totalFights}`);
  return admin.database().ref(`/ranking/${personId}/totalFights`).set(totalFights);
});

function getNextParticipantId() {
  return admin.database().ref('/metadata/lastParticipantId').transaction(counter => counter ? counter + 1 : 1)
    .then(transactionResult => transactionResult.snapshot.val());
}

/**
 * Copy registered users into other place in the tree to prevent unauthorized modification
 */
exports.registerParticipants = functions.database.ref('/commands/register/{userId}/{participantId}').onWrite((change, context) => {
  if (change.before.exists()) {
    return null;
  }

  const { userId, participantId } = context.params;
  const participant = change.after.val();
  participant.registeredBy = userId;

  console.log(`registering participant: ${participantId}, created by user: ${userId}`);

  return getNextParticipantId()
    .then(id => {
      participant.id = id;
      participant.firstName = participant.fullName.split(' ')[0];
      return admin.database().ref(`/participants/${participantId}`).set(participant)
    });
});
