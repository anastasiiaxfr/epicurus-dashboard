//Import the functions you need from the SDKs you need
import { AppCheckProvider, useFirebaseApp } from 'reactfire';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onIdTokenChanged, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


import { ref as refStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);

const initFirebase = () => { return app };

const database = getDatabase();
const firestore = getFirestore();
const storage = getStorage(app);
const auth = getAuth();


// console.log(process.env.FIREBASE_API_KEY);
// console.log(process.env.FIREBASE_AUTH_DOMAIN);
// console.log(process.env.FIREBASE_DATABASE_URL);
// console.log(process.env.FIREBASE_PROJECT_ID);
// console.log(process.env.FIREBASE_STORAGE_BUCKET);
// console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
// console.log(process.env.FIREBASE_APP_ID);

export { initFirebase, database, storage, ref, set, uploadBytes, refStorage, getDownloadURL, getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, auth, createUserWithEmailAndPassword, updateProfile, onValue, sendEmailVerification, onIdTokenChanged, sendPasswordResetEmail, firestore, collection, doc, setDoc, remove, onAuthStateChanged };
export default function () {
    return <></>;
  }