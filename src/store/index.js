import { initStore } from 'react-waterfall';
import { readMatchups, readGroups } from '../firebase';

const NBA_BRACKETS_URL = 'https://data.nba.net/prod/v1/2017/playoffsBracket.json';

const store = {
  initialState: { loading: false, brackets: [] },
  actions: {
    setUser: (state, user) => ({ user: user ? user.toJSON() : undefined }),
    setLoading: (state, loading) => ({ loading }),
    setNbaBrackets: (state, brackets) => ({ brackets }),
    getPlayoffBrackets: (state, brackets) => {
      var myHeaders = new Headers();
      myHeaders.append("Access-Control-Allow-Origin", "*");
      fetch(NBA_BRACKETS_URL, { headers: myHeaders })
        .then(res => (res.json()))
        .then(data => (actions.setNbaBrackets(data.series)));

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