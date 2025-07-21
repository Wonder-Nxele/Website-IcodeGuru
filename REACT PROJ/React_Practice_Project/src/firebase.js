// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY3VSsgYiEGWarZGncymOvVd5HFK4qYYk",
  authDomain: "i-code-guru.firebaseapp.com",
  projectId: "i-code-guru",
  storageBucket: "i-code-guru.firebasestorage.app",
  messagingSenderId: "632117068386",
  appId: "1:632117068386:web:c80bd2feb5e7502878873b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);