import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRwuq61ANF-st6Ceu8KDsL61CHvJOC1A0",
  authDomain: "users-49101.firebaseapp.com",
  projectId: "users-49101",
  storageBucket: "users-49101.appspot.com",
  messagingSenderId: "1072311967099",
  appId: "1:1072311967099:web:db6613ba407c5f0177b1de",
  measurementId: "G-7E5Z9KJCXN"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {app, db}