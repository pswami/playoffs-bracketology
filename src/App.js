import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { connect } from './store';
import { auth } from './firebase';

import Home from './routes/Home/Home';

import Me from './routes/Account/Me';

// import Landing from './routes/Bracket/Landing';
import Search from './routes/Search';

// import Create from './routes/Group/Create';
import Show from './routes/Group/Show';

import Terminal from './components/Terminal';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

import { CURRENT_USER_QUERY } from './queries';

import './App.scss';

const RouteWithProps = (props) => ({ Component, ...rest }) => (
  <Route {...rest} render={() => (
    <Component {...props} />
  )} />
);

class App extends Component {
  componentDidMount() {
    const { actions, currentUser } = this.props;

    // console.log('this.props', this.props);
    // actions.getPlayoffBrackets()

    // auth.onAuthStateChanged((user) => {
    //   console.log('user loaded', user);
    //   actions.setCurrentUser(user);
    // });
  }

  devInfo = () => {
    const { appState } = this.props;

    return (
      <Terminal>
        <li>Logged IN: {this.props.data.currentUser ? this.props.data.currentUser.email : ''}</li>
        <li>user loading: {this.props.data.loading.toString()}</li>
        <li>environment: {process.env && process.env.NODE_ENV}</li>
        <button onClick={() => this.forceUpdate()}>Force Refresh</button>
      </Terminal>
    );
  };

  render() {
    const { actions, appState } = this.props;
    const RouteProps = RouteWithProps({ actions, appState });

    // console.log('this.props', this.props.currentUser);
    return (
      <BrowserRouter>
        <div className="App bg-secondary">
          <Navbar {...{ actions, appState }} />
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
export default connect((state) => ({ appState: state }))((graphql(CURRENT_USER_QUERY))(App))