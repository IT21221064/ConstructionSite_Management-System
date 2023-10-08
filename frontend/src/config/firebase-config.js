// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLyBZ0UPdRUAfugK2-tF1Kahu8Gs1pc9w",
  authDomain: "smartbuild-300c1.firebaseapp.com",
  projectId: "smartbuild-300c1",
  storageBucket: "smartbuild-300c1.appspot.com",
  messagingSenderId: "489519661496",
  appId: "1:489519661496:web:9c14e98af2e9607f904f4d",
  measurementId: "G-XJJFLDQ3ZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebasedb = getFirestore(app);
export const database = getAuth(app);
