// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqlob8PDBPizFpB9C9nSBsvKl42msjznc",
  authDomain: "project-firebase-2025.firebaseapp.com",
  projectId: "project-firebase-2025",
  storageBucket: "project-firebase-2025.firebasestorage.app",
  messagingSenderId: "898912142252",
  appId: "1:898912142252:web:f6d1ec5ad1c2d9963f3009",
  measurementId: "G-9H54B7CWTB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);