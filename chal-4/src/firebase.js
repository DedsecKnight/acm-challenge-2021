import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAsv95UWPy2fww7UB7i7q5VKDPdjf_4djQ",
    authDomain: "acm-challenge-c71ef.firebaseapp.com",
    projectId: "acm-challenge-c71ef",
    storageBucket: "acm-challenge-c71ef.appspot.com",
    messagingSenderId: "42434219895",
    appId: "1:42434219895:web:9537a4eaa49ab1b335db72",
    measurementId: "G-KPGM03TZJV",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
