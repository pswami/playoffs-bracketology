import firebase from 'firebase';
import 'firebase/firestore';

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
export const db = firebase.database();
export const firestore = firebase.firestore();

// Refs

export const createMatchups = ({ uid, groupId, matchups }) => {
  const matchupRef = firestore.collection("matchup");
  const batch = firestore.batch();

  matchups.forEach(matchup => {
    const doc = matchupRef.doc();

    batch.set(doc, {
      seriesId: matchup.seriesId,
      team: matchup.team,
      winIn: matchup.winIn,
      uid: uid,
      groupId: 4,
    });

    return doc;
  });


  return batch.commit();
};

export const readMatchups = ({ uid, groupId }) => {
  const bracketRef = firestore.collection('matchup');
  const queryRef = bracketRef.where('uid', '==', uid)
                             .where('groupId', '==', groupId);

  return queryRef.get().then((snapshot) => {
    if (snapshot.size > 0) {
      return snapshot.docs.map(doc => doc.data());
    }
  });
}
