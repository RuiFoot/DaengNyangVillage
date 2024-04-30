// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVpHMdoOLfIdVgl4mwtjb7VMT8jk67FaA",
    authDomain: "dnvillage-e152c.firebaseapp.com",
    projectId: "dnvillage-e152c",
    storageBucket: "dnvillage-e152c.appspot.com",
    messagingSenderId: "30669382383",
    appId: "1:30669382383:web:d9f025531700f372d5711a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();