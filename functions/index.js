const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(user => {

  if (!user.email || !user.emailVerified) {
    return null;
  }

  console.log(`registering user: ${user.email}`);
  return admin.database().ref('users').child(user.uid).set({
    email: user.email,
  });
});

exports.logFight = functions.database.ref('/fights/{personId}')
    .onWrite((change, context) => {
      const personId = context.params.personId;
      const fights = change.after.val();
      const totalFights = Object.keys(fights).filter(fight => fights[fight]===true).length;

      console.log(`person: ${context.params.personId}, totalFights: ${totalFights}`);
      return admin.database().ref(`/ranking/${personId}/totalFights`).set(totalFights);
    });
