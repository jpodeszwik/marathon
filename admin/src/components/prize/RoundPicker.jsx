import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Row, Col, Button } from 'reactstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const roundLength = 5;
const pickerStyle = {
  paddingBottom: '20px',
  paddingTop: '10px',
};

const pickerButtonStyle = {
  display: 'inline-block',
  paddingLeft: '20px',
  paddingRight: '20px',
};

const roundToRoundLength = date => {
  const copiedDate = new Date(date.getTime());

  const minutes = copiedDate.getMinutes();
  copiedDate.setMinutes(minutes - (minutes % roundLength));
  copiedDate.setSeconds(0);

  return copiedDate;
};

const addMinutes = (date, minutes) => {
  const copiedDate = new Date(date.getTime());
  copiedDate.setMinutes(copiedDate.getMinutes() + minutes);
  return copiedDate;
};

const RoundPicker = props => {
  const [roundStart, setRoundStart] = useState(roundToRoundLength(new Date()));
  const onRoundSelected = props.onRoundSelected || function() {};

  useEffect(() => {
    onRoundSelected(roundStart);
  }, []);

  const nextRound = () => {
    const newRoundStart = addMinutes(roundStart, roundLength);
    setRoundStart(newRoundStart);
    onRoundSelected(newRoundStart);
  };

  const previousRound = () => {
    const newRoundStart = addMinutes(roundStart, -roundLength);
    setRoundStart(newRoundStart);
    onRoundSelected(newRoundStart);
  };

  const roundEnd = addMinutes(roundStart, roundLength);

  return (
    <Row>
      <Col style={pickerStyle}>
        <Button onClick={previousRound}>
          <FaAngleLeft />
        </Button>
        <div style={pickerButtonStyle}>
          <Moment format="DD MMM">{roundStart}</Moment> <Moment format="HH:mm">{roundStart}</Moment> - <Moment format="HH:mm">{roundEnd}</Moment>
        </div>
        <Button onClick={nextRound}>
          <FaAngleRight />
        </Button>
      </Col>
    </Row>
  );
};

RoundPicker.propTypes = {
  onRoundSelected: PropTypes.func,
};

export default RoundPicker;
