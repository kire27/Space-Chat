import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

export { default as firebase } from "firebase/compat/app";
export { 
    getAuth, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup,
    
} from "firebase/auth"; 
export {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
export { 
    addDoc, 
    setDoc,
    doc,
    getDoc,
    getDocs,
    collection,
    where,
    query,
    
} from "firebase/firestore";

export { useCollectionData } from "react-firebase-hooks/firestore";


export const app = firebase.initializeApp({
    apiKey: "AIzaSyBy1odbPQI_CpJ2IecKCusBE7_mPBEgLrI",
    authDomain: "superchat-406c5.firebaseapp.com",
    projectId: "superchat-406c5",
    storageBucket: "superchat-406c5.appspot.com",
    messagingSenderId: "727327562143",
    appId: "1:727327562143:web:39103e056b646b087805aa",
    measurementId: "G-0P88DC8NBN",
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = getStorage(app);

