import firebase from 'firebase/app';
import { firebaseConfig } from '../../firebase.config';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};
