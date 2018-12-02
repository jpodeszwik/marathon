const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(user => {

  if (user.email && user.emailVerified) {
    admin.database().ref('users').child(user.uid).set({
      email: user.email,
    });
  }
});
