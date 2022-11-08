import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1_c9_WfdXuqX4_EFtd-AzuaEG9k_xHgY",
    authDomain: "phone-auth-3a26c.firebaseapp.com",
    projectId: "phone-auth-3a26c",
    storageBucket: "phone-auth-3a26c.appspot.com",
    messagingSenderId: "144748080932",
    appId: "1:144748080932:web:3a7ab28b36888420578db1",
    measurementId: "G-M4K59X36CY"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };