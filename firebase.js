
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQajELTOBDpH9oPinQ5S2HNvJT9I0nOPg",
  authDomain: "chatweb-ff778.firebaseapp.com",
  projectId: "chatweb-ff778",
  storageBucket: "chatweb-ff778.appspot.com",
  messagingSenderId: "409587842642",
  appId: "1:409587842642:web:14aa706ca37410b5a2298b",
  measurementId: "G-N2H5EEPV1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{auth,app}