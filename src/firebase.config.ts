// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBX-0lN5IoKu9bHvhRflbJCWrPsGdu84SE',
  authDomain: 'expense-tracker-c4ba2.firebaseapp.com',
  projectId: 'expense-tracker-c4ba2',
  storageBucket: 'expense-tracker-c4ba2.firebasestorage.app',
  messagingSenderId: '1061553724938',
  appId: '1:1061553724938:web:c35aca858f42317775c9f3',
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);
