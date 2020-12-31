import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyABYc7ec1-8Cn1a1rb0pwlhajmiwxZsEWM',
    authDomain: 'linked-in-clone-e77e0.firebaseapp.com',
    projectId: 'linked-in-clone-e77e0',
    storageBucket: 'linked-in-clone-e77e0.appspot.com',
    messagingSenderId: '920314839195',
    appId: '1:920314839195:web:1156729137f6e95eca863e',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
