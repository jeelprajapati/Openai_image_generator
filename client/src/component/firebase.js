// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "openai-ac0c0.firebaseapp.com",
  projectId: "openai-ac0c0",
  storageBucket: "openai-ac0c0.appspot.com",
  messagingSenderId: "170062459742",
  appId: "1:170062459742:web:14ccfbcbb715f3be4415cf",
  measurementId: "G-P2RR96ZNR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export {storage};
export default app