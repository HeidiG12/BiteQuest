//THIS FILE EXPORTS THE AUTH THAT ALLOWS YOU TO WRITE TO BACKEND, THIS FILE IS LIKE THE KEY TO THE BACKEND AND USER DATA.



// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // IF ERROR WITH FIREBASE, USE -> npm install firebase  --legacy-peer-deps
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import if you're using Firebase Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY7XjksxyklzjofNZ-J3CBYj_ovmA0Oho",
  authDomain: "bitequest-68fcf.firebaseapp.com",
  databaseURL: "https://bitequest-68fcf-default-rtdb.firebaseio.com",
  projectId: "bitequest-68fcf",
  storageBucket: "bitequest-68fcf.appspot.com",
  messagingSenderId: "198288473851",
  appId: "1:198288473851:web:ca305f85aa1e475d5afa5e",
  measurementId: "G-NGK8MVZX91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app); // If using Firebase Realtime Database
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Conditional use of getAnalytics to avoid errors in non-browser environments

// Export the initialized Firebase services
export { app, auth, database, analytics };

