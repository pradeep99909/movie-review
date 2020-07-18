const Firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyBiCDbKQJey-UxcX3Xo6GjdNzNxdkUXvKs",
  authDomain: "movie-dd7ae.firebaseapp.com",
  databaseURL: "https://movie-dd7ae.firebaseio.com",
  projectId: "movie-dd7ae",
  storageBucket: "movie-dd7ae.appspot.com",
  messagingSenderId: "688629438155",
  appId: "1:688629438155:web:d8b5fdfe7637111a8fed4e",
  measurementId: "G-W1KB9NVD4E"
};
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

export default Firebase

