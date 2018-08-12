import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { Provider } from './store';

import 'react-select/dist/react-select.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cacheRedirects: {
    Query: {
      me: (_, { id }, { getCacheKey }) => {
        console.log(id, getCacheKey);
        return getCacheKey({ __typename: 'Book', id });
      }
    },
    Mutation: {
      login: (_, { id }, { getCacheKey }) => {
        return getCacheKey({ __typename: 'User', id });
      }
    }
  },
  request: async (operation) => {
    const token = await localStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    });
  }
});


ReactDOM.render(
  <Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

