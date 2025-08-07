// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAulPiH4ZG0frpJ5JDisgU22CARSM3S76g",
  authDomain: "digilexalphabetgame.firebaseapp.com",
  projectId: "digilexalphabetgame",
  storageBucket: "digilexalphabetgame.appspot.com",
  messagingSenderId: "404864287884",
  appId: "1:404864287884:web:f35fe3efa01c7bd20d67a9",
  measurementId: "G-MLJHTNSW7K" // ✅ You can leave this line or remove it
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const firestore = getFirestore(app);
export const db = getFirestore(app);


