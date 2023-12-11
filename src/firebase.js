// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAcBHu4rSwJohbX5XR7bGc3oqnnuwLgvM",
  authDomain: "blogs-8b205.firebaseapp.com",
  projectId: "blogs-8b205",
  storageBucket: "blogs-8b205.appspot.com",
  messagingSenderId: "1029859714536",
  appId: "1:1029859714536:web:28d1a4c64ba0a60025b05d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()