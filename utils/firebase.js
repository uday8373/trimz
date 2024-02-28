// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsE3tYAiRrkCf2lH9b-GrWXuq6Z4M6Z5I",
  authDomain: "trimz-935a6.firebaseapp.com",
  projectId: "trimz-935a6",
  storageBucket: "trimz-935a6.appspot.com",
  messagingSenderId: "164065221495",
  appId: "1:164065221495:web:9dd23a68d6f2f353265f72",
  measurementId: "G-BMKZX2Q3SE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
