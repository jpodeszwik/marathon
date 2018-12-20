import firebase from './firebase';
import 'firebase/database';

export function createUser(userData) {
  var user = firebase.auth().currentUser;
  firebase.database().ref(`fighters/${user.uid}`).push(userData);
}
