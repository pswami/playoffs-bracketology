import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';

import Home from './routes/Home/Home';
import Me from './routes/Account/Me';
// import Landing from './routes/Bracket/Landing';
import Browse from './routes/Browse';
// import Create from './routes/Group/Create';
import Show from './routes/Group/Show';
import GroupCreate from './routes/Group/Create';

import Terminal from './components/Terminal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';

import { CURRENT_USER_QUERY } from './queries';

import './App.scss';

const RouteWithProps = (props) => ({ Component, ...rest }) => (
  <Route {...rest} render={() => (
    <Component {...props} />
  )} />
);

class App extends Component {
  devInfo = () => {
    const { currentUserQuery } = this.props;
    return (
      <Terminal>
        <li>Logged ID: {currentUserQuery.currentUser ? currentUserQuery.currentUser.id : ''}</li>
        <li>Logged IN: {currentUserQuery.currentUser ? currentUserQuery.currentUser.email : ''}</li>
        <li>user loading: {currentUserQuery.loading.toString()}</li>
        <li>environment: {process.env && process.env.NODE_ENV}</li>
        <button onClick={() => currentUserQuery.refetch()}>Force Refresh</button>
      </Terminal>
    );
  };

  render() {
    const RouteProps = RouteWithProps({ });

    return (
      <BrowserRouter>
        <div className="App bg-secondary">
          <Navbar />
          <Switch>
            <Layout.Container>
              <Switch>
                <RouteProps exact path='/' Component={Home} />
                <RouteProps path='/me' Component={Me} />
                <RouteProps path='/browse' Component={Browse} />
                <RouteProps path='/group/create' Component={GroupCreate} />
                <RouteProps path='/group/:groupId' Component={Show} />
              </Switch>
            </Layout.Container>
          </Switch>
          <Footer />
          {/* {this.devInfo()} */}
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;
export default (App);
