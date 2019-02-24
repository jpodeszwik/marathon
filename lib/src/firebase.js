import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/functions'

const config = {
  apiKey: 'AIzaSyAydZjykfJaXQYesgNb-uZmlAglKQUzwvg',
  authDomain: 'marathon-835a1.firebaseapp.com',
  databaseURL: 'https://marathon-835a1.firebaseio.com',
  projectId: 'marathon-835a1',
  storageBucket: 'marathon-835a1.appspot.com',
  messagingSenderId: '659194105547',
};

firebase.initializeApp(config);

export default firebase;
