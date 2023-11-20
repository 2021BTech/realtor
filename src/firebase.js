// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVj_K0mQFxx07KcciaA5OTRd6pFT9HA5o",
  authDomain: "realtor-3d645.firebaseapp.com",
  projectId: "realtor-3d645",
  storageBucket: "realtor-3d645.appspot.com",
  messagingSenderId: "215409598717",
  appId: "1:215409598717:web:01937321fec1b302b85e94",
  measurementId: "G-LCPRRR5SFF",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
