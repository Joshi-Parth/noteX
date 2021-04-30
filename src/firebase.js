import firebase from 'firebase/app'
import 'firebase/firestore'

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");



const firebaseConfig = {
    apiKey: "AIzaSyD1l_kdkMG1g2wBBSmrxHrRBYAFFn8f_qc",
    authDomain: "notex-d456d.firebaseapp.com",
    projectId: "notex-d456d",
    storageBucket: "notex-d456d.appspot.com",
    messagingSenderId: "728416658224",
    appId: "1:728416658224:web:d8128abb6c2ebc9f475ef5",
    measurementId: "G-FZHDGYPZYH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();
    
  // var db = firebase.firestore();

  // export default db;
  
//   db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });