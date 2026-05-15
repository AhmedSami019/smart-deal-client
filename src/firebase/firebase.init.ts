// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VIDE_APIKEY,
  authDomain: import.meta.env.VIDE_AUTHDOMAIN,
  projectId: import.meta.env.VIDE_PROJECTID,
  storageBucket: import.meta.env.VIDE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VIDE_MESSAGINGSENDERID,
  appId: import.meta.env.VIDE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
