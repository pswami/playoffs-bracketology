import { initStore } from 'react-waterfall';
import { readMatchups, readGroups } from '../firebase';

const NBA_BRACKETS_URL = '/api/v1/brackets/nba.json';

const store = {
  initialState: { loading: false, brackets: [] },
  actions: {
    setUser: (state, user) => ({ user: user ? user.toJSON() : undefined }),
    setLoading: (state, loading) => ({ loading }),
    setNbaBrackets: (state, brackets) => ({ brackets }),
    getPlayoffBrackets: (state, brackets) => {
      fetch(NBA_BRACKETS_URL)
        .then(res => {
          if (res.ok) return res.json();
        })
        .then(data => {
          if (data) actions.setNbaBrackets(data.series);
        }
      );

      return state;
    }
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