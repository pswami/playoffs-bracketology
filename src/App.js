import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from './store';
import { auth } from './firebase';

import Home from './routes/Home/Home';

import Me from './routes/Account/Me';

// import Landing from './routes/Bracket/Landing';
import Edit from './routes/Bracket/Edit';

// import Create from './routes/Group/Create';
import Show from './routes/Group/Show';

import Terminal from './components/Terminal';
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
    const { actions } = this.props;

    actions.getPlayoffBrackets();

    auth.onAuthStateChanged((user) => {
      console.log('user loaded', user);
      actions.setUser(user);
    });
  }

  devInfo = () => {
    const { appState } = this.props;

    return (
      <Terminal>
        <li>Logged IN: {appState.user ? appState.user.email : ''}</li>
        <li>loading: {appState.loading}</li>
        <li>environment: {process.env && process.env.NODE_ENV}</li>
      </Terminal>
    );
  };

  render() {
    const { actions, appState } = this.props;
    const RouteProps = RouteWithProps({ actions, appState });

    console.log();
    return (
      <BrowserRouter>
        <div className="App bg-secondary">
          <Navbar {...{ actions, appState }} />
          <Switch>
            <Layout.Container>
              <RouteProps exact path='/' Component={Home} />
              <RouteProps path='/me' Component={Me} />
              <RouteProps path='/edit' Component={Edit} />
              <RouteProps path='/group/:groupId' Component={Show} />
            </Layout.Container>
          </Switch>
          {this.devInfo()}
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;
export default connect((state) => ({ appState: state }))(App)