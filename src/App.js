import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from './store';
import { auth } from './firebase';

import Home from './routes/Home/Home';

import Me from './routes/Account/Me';

import Landing from './routes/Bracket/Landing';
import Edit from './routes/Bracket/Edit';

import Create from './routes/Group/Create';
import Show from './routes/Group/Show';

import Navbar from './components/Navbar';
import Layout from './components/Layout';

import './App.scss';

const RouteWithProps = (props) => ({ Component, ...rest }) => (
  <Route {...rest} render={() => (
    <Component {...props} />
  )} />
);

class App extends Component {
  componentDidMount() {
    const { actions, appState } = this.props;

    auth.onAuthStateChanged((user) => {
      console.log('user loaded', user);
      actions.setUser(user);
      // console.log(actions.getGroups);
      // console.log(this.props);
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
    const { actions, appState } = this.props;
    const RouteProps = RouteWithProps({ actions, appState });

    return (
      <BrowserRouter>
        <div className="App bg-secondary">
          <Navbar {...{ actions, appState }} />
          <h1>loading: {`${appState.loading}`}</h1>
          <Switch>
            <Layout.Container>
              <RouteProps exact path='/' Component={Home} />
              <RouteProps path='/me' Component={Me} />
              <RouteProps path='/edit' Component={Edit} />
              <RouteProps path='/group/:groupId' Component={Show} />
            </Layout.Container>
          </Switch>
          <code>
            Logged IN:
            {appState.user ? appState.user.email : ''}
          </code>
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;
export default connect((state) => ({ appState: state }))(App)