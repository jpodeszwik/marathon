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

function getNextFighterId() {
  return admin.database().ref('/metadata/lastFighterId').transaction(counter => counter ? counter + 1 : 1)
    .then(transactionResult => transactionResult.snapshot.val());
}

/**
 * Copy registered users into other place in the tree to prevent unauthorized modification
 */
exports.copyRegistrations = functions.database.ref('/registrations/{registrantId}/{fighterId}').onWrite((change, context) => {
  if (change.before.exists()) {
    return null;
  }

  const { fighterId, registrantId } = context.params;
  const fighter = change.after.val();

  console.log(`copying fighter: ${fighterId}, registrant: ${registrantId}`);

  return getNextFighterId()
    .then(id => {
      fighter.id = id;
      return admin.database().ref(`/fighters/${registrantId}/${fighterId}`).set(fighter)
    });
});
