import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyD4GPFeB4Q4bwN8PHUrQosqn4GbBgFV1cc",
  authDomain: "nba-playoff-bracketology.firebaseapp.com",
  databaseURL: "https://nba-playoff-bracketology.firebaseio.com",
  projectId: "nba-playoff-bracketology",
  storageBucket: "",
  messagingSenderId: "1063363606506"
};

firebase.initializeApp(config);

export default firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();