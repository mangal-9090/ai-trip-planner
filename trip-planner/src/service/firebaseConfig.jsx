// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpr_-kbkvHFDziOVSylm9SdWRP0NQOzvw",
  authDomain: "trip-planner-fda89.firebaseapp.com",
  projectId: "trip-planner-fda89",
  storageBucket: "trip-planner-fda89.appspot.com",
  messagingSenderId: "708395836249",
  appId: "1:708395836249:web:07a981053d8a066f19a248",
  measurementId: "G-50GJ1QRJT2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);