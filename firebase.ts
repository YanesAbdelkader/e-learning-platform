import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCLSrIdT6aD8XkSbUhsZ77ii7cF33Bg2k0",
  authDomain: "laravel-notif-5fed1.firebaseapp.com",
  projectId: "laravel-notif-5fed1",
  storageBucket: "laravel-notif-5fed1.firebasestorage.app",
  messagingSenderId: "662220870721",
  appId: "1:662220870721:web:b7608c1fd4089d329562c0",
  measurementId: "G-DBNE5YZVJ0",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken };
