import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import firebase, { auth, provider } from './firebase';

import Landing from './routes/Bracket/Landing';
import Edit from './routes/Bracket/Edit';

import Create from './routes/Group/Create';
import List from './routes/Group/List';

import Navbar from './components/Navbar';
import Layout from './components/Layout';

import './App.scss';

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      console.log('user loaded', user);
      this.setState({ user });
    });
  }

  render() {
    return (
      <div className="App bg-secondary">
        <Navbar />
        <Switch>
          <Layout.Container>
            <Route exact path='/' component={Landing} />
            <Route path='/edit' component={Edit} />
            <Route path='/list' component={List} />
          </Layout.Container>
        </Switch>
        <code>
          Logged IN:
          {this.state.user ? this.state.user.email : ''}
        </code>
      </div>
    );
  }
}

export default App;
