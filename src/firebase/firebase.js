// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG4_cpL7H63teQSJELkQakgBX-C7HFGO4",
  authDomain: "react-accountbook-d1fab.firebaseapp.com",
  projectId: "react-accountbook-d1fab",
  storageBucket: "react-accountbook-d1fab.appspot.com",
  messagingSenderId: "1034084333",
  appId: "1:1034084333:web:e213269a4ddfa5b39091e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage();