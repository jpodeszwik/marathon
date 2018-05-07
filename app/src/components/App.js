import React, { Component } from 'react';
import { Container } from 'reactstrap';
import moment from 'moment';
import './App.css';
import AppHeader from './AppHeader';
import Keyboard from './Keyboard';
import RoundPicker from './RoundPicker';
import firebase from '../services/firebase';

class App extends Component {
  constructor() {
    super();
    this.roundDate = new Date();
  }
  numberSent(number) {
    const round = moment(this.roundDate).format('DD MMM HH:mm');
    firebase.database().ref(number).push(round);
  }
  roundSelected(date) {
    this.roundDate = date;
  }
  render() {
    return (
      <div className="App">
        <Container>
          <AppHeader />
          <RoundPicker onRoundSelected={this.roundSelected.bind(this)}/>
          <Keyboard onSave={this.numberSent.bind(this)} />
        </Container>
      </div>
    );
  }
}

export default App;
