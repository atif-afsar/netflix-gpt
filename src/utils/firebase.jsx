// firebase.js (or firebaseConfig.js)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUEFxdMH0j71Umcm7FjXNJtrM8Nw26PEA",
  authDomain: "netflixgpt-64491.firebaseapp.com",
  projectId: "netflixgpt-64491",
  storageBucket: "netflixgpt-64491.appspot.com", // ❗ Fixed typo here
  messagingSenderId: "170247320707",
  appId: "1:170247320707:web:b6f41caaed31c4350f97b6",
  measurementId: "G-R21879T3FS"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if window is available)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
