// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernproject-72890.firebaseapp.com",
  projectId: "mernproject-72890",
  storageBucket: "mernproject-72890.appspot.com",
  messagingSenderId: "676745906762",
  appId: "1:676745906762:web:8bdae81a64f7e11653b4b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);