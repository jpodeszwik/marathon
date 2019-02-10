import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAydZjykfJaXQYesgNb-uZmlAglKQUzwvg',
  authDomain: 'marathon-835a1.firebaseapp.com',
  databaseURL: 'https://marathon-835a1.firebaseio.com',
  projectId: 'marathon-835a1',
  storageBucket: 'marathon-835a1.appspot.com',
  messagingSenderId: '659194105547',
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const logIn = () => auth.signInWithPopup(provider);
export const logOut = () => auth.signOut();
export const onUserChange = cb => auth.onAuthStateChanged(user => cb(user));

export const checkPermissionToRegisterFights = user =>
  firebase
    .database()
    .ref(`users/${user.uid}/registerFights`)
    .once('value')
    .then(snapshot => snapshot.val());

export default firebase;
