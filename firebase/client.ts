// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASSpLH15n2wF_74U6hdnrmwUZ6QRz5bGE",
  authDomain: "airecruter.firebaseapp.com",
  projectId: "airecruter",
  storageBucket: "airecruter.firebasestorage.app",
  messagingSenderId: "387354928766",
  appId: "1:387354928766:web:9558ea198c232b4a289a2f",
  measurementId: "G-MVB9GZ4QNT",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
