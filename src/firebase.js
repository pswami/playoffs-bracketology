import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: 'AIzaSyD4GPFeB4Q4bwN8PHUrQosqn4GbBgFV1cc',
  authDomain: 'nba-playoff-bracketology.firebaseapp.com',
  databaseURL: 'https://nba-playoff-bracketology.firebaseio.com',
  projectId: 'nba-playoff-bracketology',
  storageBucket: '',
  messagingSenderId: '1063363606506'
};

firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

/* User */

export const findUsers = (name) => {
  const userRef = firestore.collection('user');
  const queryRef = userRef.where('name', '<=', name)

  return queryRef.get().then((snapshot) => {
    if (snapshot.size > 0) {
      return snapshot.docs.map(doc => (doc.data()));
    }
  });
};

export const getUserProfile = (uid) => {
  const userRef = firestore.collection('user');
  const doc = userRef.doc(uid);

  return doc.get().then((snapshot) => {
    return snapshot.data();
  });
};

export const setUserProfile = ({ uid, name }) => {
  const userRef = firestore.collection('user');
  const doc = userRef.doc(uid);

  return doc.set({
    uid,
    name,
  })
  .then(function (docRef) {
    return docRef;
  });
};

/* Group */

export const addUsersToGroup = ({ groupId, users }) => {
  const groupRef = firestore.collection('group');
  const doc = groupRef.doc(groupId);

  return doc.get().then((snapshot) => {
    if (snapshot) {
      const group = snapshot.data();

      return doc.set({
        updated_at: serverTimestamp,
        users: [...group.users, ...users],
      }).then(function (docRef) {
        return true;
      });
    }
  });
};

export const createGroup = ({ uid, name, rules }) => {
  const groupRef = firestore.collection('group');

  return groupRef.add({
    creator: uid,
    created_at: serverTimestamp,
    updated_at: serverTimestamp,
    users: [uid],
    name: name,
    rules: {
      winPoints: rules.winPoints,
      gamePoints: rules.gamePoints,
      type: rules.type,
    },
  })
  .then(function (docRef) {
    return docRef;
  });
};

export const readGroups = ({ uid } = {}) => {
  const groupRef = firestore.collection('group');
  let queryRef = groupRef;

  return queryRef.get().then((snapshot) => {
    if (snapshot.size > 0) {
      let docs = snapshot.docs;

      if (uid) {
        docs = docs.filter(doc => doc.data().users.includes(uid))
      }

      return docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
  });
};

/* Matchups */

export const setMatchups = ({ uid, groupId, matchups }) => {
  const matchupRef = firestore.collection("matchup");
  const batch = firestore.batch();

  matchups.forEach(matchup => {
    const doc = matchupRef.doc(`${uid}-${groupId}-${matchup.seriesId}`);

    batch.set(doc, {
      seriesId: matchup.seriesId,
      team: matchup.team,
      winIn: matchup.winIn,
      uid: uid,
      groupId: groupId,
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
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
  });
};
