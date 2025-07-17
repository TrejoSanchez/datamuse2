import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD11y844mqUHeZDnoH9PEZAZxWA_jATnFo",
  authDomain: "museodecera-20e01.firebaseapp.com",
  projectId: "museodecera-20e01",
  storageBucket: "museodecera-20e01.firebasestorage.app",
  messagingSenderId: "724963680037",
  appId: "1:724963680037:web:7e185ad1422ba761f904cc",
  measurementId: "G-R845FW45VE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
