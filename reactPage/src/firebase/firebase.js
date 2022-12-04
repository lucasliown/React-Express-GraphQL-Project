// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWepN_heh59UIRoE4Q9OPbdMVRIDhiZ9Q",
  authDomain: "whitegive-bc20c.firebaseapp.com",
  projectId: "whitegive-bc20c",
  storageBucket: "whitegive-bc20c.appspot.com",
  messagingSenderId: "624116249669",
  appId: "1:624116249669:web:1a66b2016c180a61abdf2c",
  measurementId: "G-EG7KRKQYKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
