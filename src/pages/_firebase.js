//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage(app);
const initFirebase = () => { return app };
const auth = getAuth();


// console.log(process.env.FIREBASE_API_KEY);
// console.log(process.env.FIREBASE_AUTH_DOMAIN);
// console.log(process.env.FIREBASE_DATABASE_URL);
// console.log(process.env.FIREBASE_PROJECT_ID);
// console.log(process.env.FIREBASE_STORAGE_BUCKET);
// console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
// console.log(process.env.FIREBASE_APP_ID);

export { app, database, storage, ref, set, uploadBytes, refStorage, getDownloadURL, getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, initFirebase, auth};
export default function () {
    return <></>;
  }