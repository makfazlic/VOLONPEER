import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID    
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function register_base(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login_google() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export function login_base(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}


export function logout() {
    signOut(auth);
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => { setCurrentUser(user) });
        return unsubscribe
    }, [])
    return currentUser;
}