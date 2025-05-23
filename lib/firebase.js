// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase SDK configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIPo00pvlxxe4VLw7e-XpUZhwmmCDKAEc",
  authDomain: "analisiscv-c3b85.firebaseapp.com",
  projectId: "analisiscv-c3b85",
  storageBucket: "analisiscv-c3b85.firebasestorage.app",
  messagingSenderId: "136972787849",
  appId: "1:136972787849:web:9cbc527c3cc39f7d226658",
  measurementId: "G-FE9LRQ1MRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
