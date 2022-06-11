import firebase from 'firebase/app';
import { firebaseConfig } from '../../firebase.config';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
};
