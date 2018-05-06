import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import Keyboard from './Keyboard';
import RoundPicker from './RoundPicker';
import { Container } from 'reactstrap';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Container>
          <AppHeader />
          <RoundPicker />
          <Keyboard />
        </Container>
      </div>
    );
  }
}

export default App;
