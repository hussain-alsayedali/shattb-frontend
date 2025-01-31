import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDozna-AvS9mimtJJh5YbGF7jA9_3ZyNzY",

  authDomain: "nestjs-simple-backend.firebaseapp.com",

  projectId: "nestjs-simple-backend",

  storageBucket: "nestjs-simple-backend.firebasestorage.app",

  messagingSenderId: "483308793880",

  appId: "1:483308793880:web:def91f1a2c59d24f02536d",

  measurementId: "G-QG79EKCNS6",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
