import { initStore } from 'react-waterfall';

const store = {
  initialState: { loading: false, user: null },
  actions: {
    setUser: (state, user) => ({ user }),
    setLoading: (state, loading) => ({ loading }),
    fetchData: (state, user) => {
      // actions.fetching();
      // console.log('fetching');

      // setTimeout(() => {
      //   actions.fetchDone();
      //   console.log('fetchDone');
      // }, 5000);
    },
  },
}

export const {
  Provider,
  Consumer,
  actions,
  getState,
  connect,
  subscribe,
} = initStore(store);