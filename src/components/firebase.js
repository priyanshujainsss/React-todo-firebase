import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig)
const auth=firebase.auth();
const db=firebase.firestore();

export {auth,db}