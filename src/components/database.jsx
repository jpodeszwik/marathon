import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyAydZjykfJaXQYesgNb-uZmlAglKQUzwvg',
    authDomain: 'marathon-835a1.firebaseapp.com',
    databaseURL: 'https://marathon-835a1.firebaseio.com',
    projectId: 'marathon-835a1',
    storageBucket: 'marathon-835a1.appspot.com',
    messagingSenderId: '659194105547',
  };
  
  const app = firebase.initializeApp(config);
  const base = Rebase.createClass(app.database());

  export { base }
  