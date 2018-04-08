import { initStore } from 'react-waterfall';
import { createMatchups, readMatchups, createGroup, readGroups } from '../firebase';

const store = {
  initialState: { loading: false, user: null, groups: [] },
  actions: {
    setUser: (state, user) => ({ user: user ? user.toJSON() : undefined }),
    setLoading: (state, loading) => ({ loading }),
    setGroups: (state, groups) => ({ groups }),
    setMyGroups: (state, myGroups) => ({ myGroups }),
    setBracket: (state, matchups) => ({ bracket: matchups }),
    getMyGroups: (state,) => {
      if (state.user) {
        actions.setLoading(true);

        readGroups({ uid: state.user.uid })
          .then((response) => {
            actions.setLoading(false);
            actions.setMyGroups(response);
          });
      } else {
        console.error('user does not exist');
      }
    },
    getGroups: (state, params) => {
      actions.setLoading(true);

      console.log(state, params);
      readGroups(params)
        .then((response) => {
          actions.setLoading(false);
          actions.setGroups(response);
          return response;
        });

      return Promise.resolve();
    },
    getBracket: (state, params) => {
      actions.setLoading(true);

      readMatchups(params) //{ uid: user.uid, groupId: 4 }
        .then((response) => {
          actions.setLoading(false);
          actions.setGroups(response);
        });
    },
    postBracket: (state, params) => {
      actions.setLoading(true);


      // createMatchups({
      //   uid: user.uid,
      //   matchups: [{
      //     seriesId: 2,
      //     team: "GSW",
      //     winIn: 5,
      //   }, {
      //     seriesId: 20,
      //     team: "ATL",
      //     winIn: 7,
      //   }]
      // }).then((response) => {
      //   actions.setLoading(false);
      //   actions.setGroups(response);
      // });
    },
  },
}

function name(store, self) {
  console.log(store, self);

  return (key, value) => { return Promise.resolve({ [key]: Promise.resolve(value) }) };
};

export const {
  Provider,
  Consumer,
  actions,
  getState,
  connect,
  subscribe,
} = initStore(store, name);