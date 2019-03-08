import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { Provider } from './store';

import 'react-select/dist/react-select.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

// client.mutate({
//   mutation: gql`
//     mutation {
//       login(email: "p@p.com", password: "123456") {
//         token
//         user {
//           email
//         }
//       }
//     }
//   `
// })
// .then(result => console.log(result));

// client.query({
//   query: gql`
//     {
//       users {
//         id
//         email
//       }
//     }
//   `
// })
// .then(result => console.log(result));

ReactDOM.render(
  <Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
