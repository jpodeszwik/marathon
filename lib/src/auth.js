import firebase from "./firebase";

const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const logIn = () => auth.signInWithPopup(provider);
export const logOut = () => auth.signOut();
export const onUserChange = cb => auth.onAuthStateChanged(cb);

export const checkPermissionToRegisterFights = user =>
    firebase
        .database()
        .ref(`users/${user.uid}/registerFights`).once('value')
        .then(snapshot => snapshot.val());

export const getLoggedInUserPermissions = () => {
    const uid = firebase.auth().currentUser.uid;
    return firebase.database().ref(`users/${uid}`).once('value')
        .then(snapshot =>  snapshot.val());
};

export const toggleRegisterFights = (uid, val) => {
    return firebase.database().ref(`users/${uid}/registerFights`).set(val);
};

export const toggleRegisterParticipants = (uid, val) => {
    return firebase.database().ref(`users/${uid}/registerParticipants`).set(val);
};

export const toggleManageUsers = (uid, val) => {
    return firebase.database().ref(`users/${uid}/manageUsers`).set(val);
};

export const subscribeForListUsers = callback => {
    const listener = firebase.database().ref('users').on('value', snapshot => {
        const val = snapshot.val();
        const keys = Object.keys(val);
        const userList = keys.map(key => ({ id: key, ...val[key] }));
        callback(userList);
    });

    return () => firebase.database().ref('users').off('value', listener)
};
