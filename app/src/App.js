import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import Keyboard from './Keyboard';

class App extends Component {
  render(){
    return (
      <div className="App">
        <AppHeader />
        <Keyboard />
      </div>
    );
  }
}

export default App;
