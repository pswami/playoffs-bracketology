import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from './store';

import 'react-select/dist/react-select.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

