// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHgtYDB-2aY5NCNcx0w7SA1WwwVGaGpKY",
  authDomain: "inventorywauth.firebaseapp.com",
  projectId: "inventorywauth",
  storageBucket: "inventorywauth.appspot.com",
  messagingSenderId: "153359260502",
  appId: "1:153359260502:web:5d78e85bc5b323ff54d4f7",
  measurementId: "G-2HS00MTQ85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore =getFirestore(app);

export{firestore};