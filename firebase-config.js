import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCstPBoZjDt6wa-iGh7Ck5JN2Ld8tPO198",
  authDomain: "myprojet-c972a.firebaseapp.com",
  projectId: "myprojet-c972a",
  storageBucket: "myprojet-c972a.appspot.com",
  messagingSenderId: "948045417455",
  appId: "1:948045417455:android:173b2c3033d0dd4a64841a",
  databaseURL: "https://myprojet-c972a-default-rtdb.firebaseio.com"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Configuration de l'authentification Firebase
const auth = getAuth(app);

export { auth };
