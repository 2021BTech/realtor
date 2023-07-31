// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc2jfM1cT93Gl5f-auTVYRB5lqElvsh0c",
  authDomain: "realtor-react-9241d.firebaseapp.com",
  projectId: "realtor-react-9241d",
  storageBucket: "realtor-react-9241d.appspot.com",
  messagingSenderId: "693474815047",
  appId: "1:693474815047:web:d4488a516b7c886eed9562",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
