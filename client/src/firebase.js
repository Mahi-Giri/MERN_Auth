// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "mern-auth-2813e.firebaseapp.com",
    projectId: "mern-auth-2813e",
    storageBucket: "mern-auth-2813e.appspot.com",
    messagingSenderId: "727546392307",
    appId: "1:727546392307:web:81945c9454387fb9bd1186",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
