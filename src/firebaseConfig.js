// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBEFJwqqOUz6YaOwGpm5VcvRLdoIKEifE',
  authDomain: 'ass3-9b7fb.firebaseapp.com',
  projectId: 'ass3-9b7fb',
  storageBucket: 'ass3-9b7fb.firebasestorage.app',
  messagingSenderId: '944157136967',
  appId: '1:944157136967:web:26adef73551d42d68fb962',
  measurementId: 'G-2XSZ66NXD9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and export it
const auth = getAuth(app)
export { auth }
