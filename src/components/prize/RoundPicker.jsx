import React, { Component } from 'react';
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

const roundToRoundLength = (date) => {
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

class RoundPicker extends Component {
  constructor(props) {
    super(props);
    this.onRoundSelected = props.onRoundSelected;
    const date = roundToRoundLength(new Date());
    this.state = { roundStart: date };
  }

  componentDidMount() {
    if (this.onRoundSelected) this.onRoundSelected(this.state.roundStart);
  }

  nextRound() {
    this.setState((prevState) => {
      const newRoundStart = addMinutes(prevState.roundStart, roundLength);
      if (this.onRoundSelected) this.onRoundSelected(newRoundStart);
      return { roundStart: newRoundStart };
    });
  }

  previousRound() {
    this.setState((prevState) => {
      const newRoundStart = addMinutes(prevState.roundStart, -roundLength);
      if (this.onRoundSelected) this.onRoundSelected(newRoundStart);
      return { roundStart: newRoundStart };
    });
  }

  render() {
    const start = this.state.roundStart;
    const end = addMinutes(this.state.roundStart, roundLength);

    return (
      <Row>
        <Col style={pickerStyle}>
          <Button onClick={this.previousRound.bind(this)}><FaAngleLeft /></Button>
          <div style={pickerButtonStyle}>
            <Moment format="DD MMM">{start}</Moment> <Moment format="HH:mm">{start}</Moment> - <Moment format="HH:mm">{end}</Moment>
          </div>
          <Button onClick={this.nextRound.bind(this)}><FaAngleRight /></Button>
        </Col>
      </Row>
    );
  }
}

RoundPicker.propTypes = {
  onRoundSelected: PropTypes.func,
};

export default RoundPicker;
