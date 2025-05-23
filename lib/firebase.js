// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase SDK configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-ijbrXd4gyCyV80iEVQN5v-RGJ3N86Po",
  authDomain: "portofolio-eba96.firebaseapp.com",
  projectId: "portofolio-eba96",
  storageBucket: "portofolio-eba96.firebasestorage.app",
  messagingSenderId: "1071470009346",
  appId: "1:1071470009346:web:4f385bff6009027149db1b",
  measurementId: "G-PHYC78JTTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
