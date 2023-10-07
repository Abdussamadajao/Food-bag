import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-xhKuQP4sVYn_1dTIv2b7M-62QY0v6vc",
  authDomain: "foodbag-ada0a.firebaseapp.com",
  projectId: "foodbag-ada0a",
  storageBucket: "foodbag-ada0a.appspot.com",
  messagingSenderId: "881216574620",
  appId: "1:881216574620:web:158ce7feb17636c81e8959",
  measurementId: "G-JHZEY7LT0L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
