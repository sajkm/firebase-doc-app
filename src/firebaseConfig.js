
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCwfJUksih33-oYZW74AQ6wz-OOOOOTxA",
  authDomain: "doc-app-firebase.firebaseapp.com",
  projectId: "doc-app-firebase",
  storageBucket: "doc-app-firebase.appspot.com",
  messagingSenderId: "136022288618",
  appId: "1:136022288618:web:a371ad2196788163cc0f93"
};


const app = initializeApp(firebaseConfig);

export const database = getFirestore (app);