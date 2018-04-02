import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { auth } from './firebase';
// import { createMatchups, readMatchups, createGroup, readGroups } from './firebase';

import Home from './routes/Home/Home';

import Landing from './routes/Bracket/Landing';
import Edit from './routes/Bracket/Edit';

import Create from './routes/Group/Create';
import Show from './routes/Group/Show';

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

      // createGroup({
      //   uid: user.uid,
      //   rules: {
      //     "winPoints": 1,
      //     "gamePoints": 1,
      //     "type": "continous",
      //   }
      // })
      // readGroups().then((res) => console.log(res));
      // readMatchups({ uid: user.uid, groupId: 4}).then((res) => console.log(res));
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
      // }).then((docRef) => console.log('SECOND LOG', docRef));
    });
  }

  render() {
    return (
      <div className="App bg-secondary">
        <Navbar />
        <Switch>
          <Layout.Container>
            <Route exact path='/' component={Home} />
            <Route path='/edit' component={Edit} />
            <Route path='/group/:groupId' component={Show} />
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
