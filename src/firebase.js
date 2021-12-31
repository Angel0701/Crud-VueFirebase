// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1wz24UGuasLjsuzTB7nB4vBlW9ubyqbw",
    authDomain: "crud-vue-8b786.firebaseapp.com",
    projectId: "crud-vue-8b786",
    storageBucket: "crud-vue-8b786.appspot.com",
    messagingSenderId: "933900563020",
    appId: "1:933900563020:web:6c10acbd2b94bc03aabae9",
    measurementId: "G-RWE58SZTD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db