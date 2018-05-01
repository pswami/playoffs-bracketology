import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import Api from './api';
import { connect } from './store';
import { auth } from './firebase';

import Home from './routes/Home/Home';
import Me from './routes/Account/Me';
import Search from './routes/Search';
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
  constructor(props) {
    super(props);

    window.API = new Api(props.client);
  }
  componentDidMount() {
    const { actions } = this.props;

    // window.API.getNBABracket()
    // .then(result => {
    //   console.log(result)
    // });

    if(localStorage.getItem('token')) {
      window.API.me()
        .then(result => {
          console.log(result)
          console.log(this.props.client);
        });
    }
    // auth.onAuthStateChanged((user) => {
    //   console.log('user loaded', user);
    //   actions.setCurrentUser(user);
    // });
  }

  devInfo = () => {
    const { appState } = this.props;

    return (
      <Terminal>
        <li>Logged IN: {appState.currentUser ? appState.currentUser.email : ''}</li>
        <li>loading: {appState.loading}</li>
        <li>environment: {process.env && process.env.NODE_ENV}</li>
      </Terminal>
    );
  };

  render() {
    const { actions, appState, client } = this.props;
    const RouteProps = RouteWithProps({ actions, appState, client });

    return (
      <BrowserRouter>
        <div className="App bg-secondary">
          <Navbar {...{ actions, appState, client }} />
          <Switch>
            <Layout.Container>
              <RouteProps exact path='/' Component={Home} />
              <RouteProps path='/me' Component={Me} />
              <RouteProps path='/search' Component={Search} />
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
export default withApollo(connect((state) => ({ appState: state }))(App));