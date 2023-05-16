import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW-w0dx1RbfsNjf1YBbNyJTE728dus9g8",
  authDomain: "samakibay.firebaseapp.com",
  projectId: "samakibay",
  storageBucket: "samakibay.appspot.com",
  messagingSenderId: "562732247934",
  appId: "1:562732247934:web:a04754a016a611f518a12f",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
