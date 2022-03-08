import firebase from "firebase/app";
import "firebase/firestore";






const firebaseConfig = {
    apiKey: "AIzaSyALgjOUTpUbl-CegOPOUyUMu4fzUpRpCJ0",
    authDomain: "inventory-project-236d0.firebaseapp.com",
    projectId: "inventory-project-236d0",
    storageBucket: "inventory-project-236d0.appspot.com",
    messagingSenderId: "505556410802",
    appId: "1:505556410802:web:eacff303e256384b5d84ab",
    measurementId: "G-NWLE38MNER"
  };




const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();