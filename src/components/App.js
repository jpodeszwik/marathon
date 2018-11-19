import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import AppHeader from './AppHeader';
import Keyboard from './Keyboard';
import RoundPicker from './RoundPicker';
import NumberList from './NumberList.jsx';
import { pushNumber, readNumbers, removeNumber } from '../services/numbers';

class App extends Component {
  constructor() {
    super();
    this.round = new Date();
    this.state = { numbers: [] };
    this.numberSent = this.numberSent.bind(this);
    this.roundSelected = this.roundSelected.bind(this);
    this.numberRemoved = this.numberRemoved.bind(this);
  }

  numberSent(number) {
    pushNumber(this.round, number);
    this.setState((prevState) => {
      const newNumbers = prevState.numbers.slice();
      newNumbers.unshift(number);
      return {
        numbers: newNumbers,
      };
    });
  }

  roundSelected(date) {
    this.round = date;
    readNumbers(date).then((numbers) => {
      this.setState({ numbers });
    });
  }

  numberRemoved(number) {
    removeNumber(this.round, number);
    this.setState((prevState) => {
      const newNumbers = prevState.numbers.slice()
        .filter(val => number !== val);

      return {
        numbers: newNumbers,
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <AppHeader />
          <RoundPicker onRoundSelected={this.roundSelected} />
          <Keyboard onSave={this.numberSent} />
          <NumberList onRemoveNumber={this.numberRemoved} numbers={this.state.numbers}/>
        </Container>
      </div>
    );
  }
}

export default App;
