import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './routes/Bracket/Landing';
import Edit from './routes/Bracket/Edit';

import Navbar from './components/Navbar';
import Layout from './components/Layout';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Layout.Container>
            <Route exact path='/' component={Landing} />
            <Route path='/edit' component={Edit} />
          </Layout.Container>
        </Switch>
      </div>
    );
  }
}

export default App;
