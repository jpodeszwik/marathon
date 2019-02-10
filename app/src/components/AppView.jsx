import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Keyboard from './Keyboard.jsx';
import RoundPicker from './RoundPicker.jsx';
import NumberList from './NumberList.jsx';
import { pushFight, removeFight, listFights } from '../services/fights';
import UnprocessedRecordsCount from './UnprocessedRecordsCount.jsx';

const AppView = props => {
  const [numbers, setNumbers] = useState([]);
  const round = useRef(new Date());

  const addNumber = number => {
    const numbersCopy = numbers.slice();
    numbersCopy.unshift(number);
    setNumbers(numbersCopy);
  };

  const removeNumber = number => {
    setNumbers(numbers.filter(val => number !== val));
  };

  const numberSent = number => {
    if (numbers.includes(number)) {
      return;
    }

    addNumber(number);
    pushFight(round.current, number).catch(err => {
      props.displayAlert(`could not add number: ${err.code ? err.code : err}`);
      removeNumber(number);
    });
  };

  const numberRemoved = number => {
    removeNumber(number);
    removeFight(round.current, number).catch(err => {
      props.displayAlert(`could not remove number: ${err.code ? err.code : err}`);
      addNumber(number);
    });
  };

  const roundSelected = useCallback(date => {
    round.current = date;
    setNumbers([]);
    listFights(date).then(val => {
      setNumbers(val);
    });
  }, []);

  return (
    <div>
      <UnprocessedRecordsCount />
      <RoundPicker onRoundSelected={roundSelected} />
      <Keyboard onSave={numberSent} />
      <NumberList onRemoveNumber={numberRemoved} numbers={numbers} />
    </div>
  );
};

AppView.propTypes = {
  displayAlert: PropTypes.func,
};

export default AppView;
