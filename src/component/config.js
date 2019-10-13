const Firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyDZsjINu9aerw6itaCwwayaR1C7isSfKXk",
  authDomain: "proj1-798c4.firebaseapp.com",
  databaseURL: "https://proj1-798c4.firebaseio.com",
  projectId: "proj1-798c4",
  storageBucket: "proj1-798c4.appspot.com",
  messagingSenderId: "332847525454",
  appId: "1:332847525454:web:100195b9d746896c"
};
// Initialize Firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

export default Firebase

