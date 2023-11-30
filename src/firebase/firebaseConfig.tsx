import { initializeApp, FirebaseApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4PHHoILVqF5l30XBrnDKf59xVvbGfg-M",
  authDomain: "gizapp-1712.firebaseapp.com",
  projectId: "gizapp-1712",
  storageBucket: "gizapp-1712.appspot.com",
  messagingSenderId: "419851624828",
  appId: "1:419851624828:web:d6f2fb3259c86f29ae84f9",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

export default app;
