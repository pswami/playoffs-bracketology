import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Layout.Container>
          HI
        </Layout.Container>
      </div>
    );
  }
}

export default App;
