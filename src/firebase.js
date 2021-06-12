import firebase from "firebase/app"
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBeKWhpmc6mYPVeDdR1FR_-HnOPtw9bhYI",
    authDomain: "fir-50900.firebaseapp.com",
    projectId: "fir-50900",
    storageBucket: "fir-50900.appspot.com",
    messagingSenderId: "884934675624",
    appId: "1:884934675624:web:4d5a60146db11346a0c69d",
    measurementId: "G-3YEK74HN5V"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.auth()