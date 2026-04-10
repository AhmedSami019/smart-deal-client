// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDddGrfOAyIMP1G0s87wIJps_-0E3-hLSo",
  authDomain: "smart-deal-a565c.firebaseapp.com",
  projectId: "smart-deal-a565c",
  storageBucket: "smart-deal-a565c.firebasestorage.app",
  messagingSenderId: "945835937456",
  appId: "1:945835937456:web:7b7f923f793c966046b575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
