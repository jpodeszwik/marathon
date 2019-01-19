import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Keyboard from './Keyboard.jsx';
import RoundPicker from './RoundPicker.jsx';
import NumberList from './NumberList.jsx';
import { pushFight, removeFight, listFights } from '../services/fights';
import UnprocessedRecordsCount from './UnprocessedRecordsCount.jsx';

class AppView extends Component {
  constructor(props) {
    super(props);
    this.round = new Date();
    this.state = {
      numbers: [],
    };
    this.numberSent = this.numberSent.bind(this);
    this.roundSelected = this.roundSelected.bind(this);
    this.numberRemoved = this.numberRemoved.bind(this);
    this.removeNumber = this.removeNumber.bind(this);
    this.addNumber = this.addNumber.bind(this);
  }

  numberSent(number) {
    if (this.state.numbers.includes(number)) {
      return;
    }

    pushFight(this.round, number).catch((err) => {
      this.props.displayAlert(`could not add number: ${err.code ? err.code : err}`);
      this.removeNumber(number);
    });
    this.addNumber(number);
  }

  numberRemoved(number) {
    this.removeNumber(number);
    removeFight(this.round, number).catch((err) => {
      this.props.displayAlert(`could not remove number: ${err.code ? err.code : err}`);
      this.addNumber(number);
    });
  }

  addNumber(number) {
    this.setState((prevState) => {
      const newNumbers = prevState.numbers.slice();
      newNumbers.unshift(number);
      return {
        numbers: newNumbers,
      };
    });
  }

  removeNumber(number) {
    this.setState((prevState) => {
      const newNumbers = prevState.numbers.slice()
        .filter(val => number !== val);

      return {
        numbers: newNumbers,
      };
    });
  }

  roundSelected(date) {
    this.round = date;
    this.setState({ numbers: [] });
    listFights(date).then((numbers) => {
      this.setState({ numbers });
    });
  }

  render() {
    return (
      <div>
        <UnprocessedRecordsCount/>
        <RoundPicker onRoundSelected={this.roundSelected} />
        <Keyboard onSave={this.numberSent} />
        <NumberList onRemoveNumber={this.numberRemoved} numbers={this.state.numbers}/>
      </div>
    );
  }
}

AppView.propTypes = {
  displayAlert: PropTypes.func,
};

export default AppView;
