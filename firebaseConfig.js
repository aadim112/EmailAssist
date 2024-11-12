// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2lw6K8rxm7RTG3PzTxBX49PmKAAy9PDg",
  authDomain: "emailassistant-ade38.firebaseapp.com",
  projectId: "emailassistant-ade38",
  storageBucket: "emailassistant-ade38.firebasestorage.app",
  messagingSenderId: "509757252816",
  appId: "1:509757252816:web:6a52c6b4402ac768f3aad5",
  measurementId: "G-N8NBCMLX97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);