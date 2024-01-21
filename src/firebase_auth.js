// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkhbdRflDnKHqeqnmiXF2E9cFOSM-JckA",
  authDomain: "fitness-pro-5a801.firebaseapp.com",
  databaseURL: "https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-pro-5a801",
  storageBucket: "fitness-pro-5a801.appspot.com",
  messagingSenderId: "933222395319",
  appId: "1:933222395319:web:ec134b9bba251a363d0c32"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // removing `export` from here

export default auth; // using default export
