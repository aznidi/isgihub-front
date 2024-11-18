import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import the Authentication module
import { getDatabase } from 'firebase/database';

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAaygfxiDreXLo3I1w3rjSHpsBB4xn2gkk",
  authDomain: "myprojet-c972a.firebaseapp.com",
  databaseURL: "https://myprojet-c972a-default-rtdb.firebaseio.com",
  projectId: "myprojet-c972a",
  storageBucket: "myprojet-c972a.appspot.com",
  messagingSenderId: "948045417455",
  appId: "1:948045417455:web:8d8e132fef135e8964841a",
  measurementId: "G-5BT25CB6L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
export const auth = getAuth(app); // Initialisation du service Authentification
export const database = getDatabase(app); // Initialisation du service Realtime Database

