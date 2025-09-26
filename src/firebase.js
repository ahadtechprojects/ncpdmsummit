// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZdM998JDWmJfKVLVqZF0rtAAPvx3CDIM",
  authDomain: "qrcodegenerator-c1711.firebaseapp.com",
  projectId: "qrcodegenerator-c1711",
  storageBucket: "qrcodegenerator-c1711.appspot.com", // ✅ FIXED
  messagingSenderId: "796584508251",
  appId: "1:796584508251:web:4686734e15b9041f00387e",
  measurementId: "G-ZT8L159NJL",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
