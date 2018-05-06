import React, { Component } from 'react';
import Moment from 'react-moment';
import { Row, Col, Button } from 'reactstrap';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

const roundLength = 5;

const roundToRundLength = date => {
  const copiedDate = new Date(date.getTime());

  const minutes = copiedDate.getMinutes();
  copiedDate.setMinutes(minutes - (minutes % roundLength));

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
    this.state = {roundStart: roundToRundLength(new Date())};
  }

  nextRound() {
    this.setState((prevState) => {
      return {roundStart: addMinutes(prevState.roundStart, roundLength)};
    });
  }

  previousRound() {
    this.setState((prevState) => {
      return {roundStart: addMinutes(prevState.roundStart, -roundLength)};
    });
  }

  render(){
    const start = this.state.roundStart;
    const end = addMinutes(this.state.roundStart, roundLength);

    return (
      <Row>
        <Col>
          <Button onClick={this.previousRound.bind(this)}><FaAngleLeft /></Button>
          <Moment format="DD MMM">{start}</Moment> <Moment format="HH:mm">{start}</Moment> - <Moment format="HH:mm">{end}</Moment>
          <Button onClick={this.nextRound.bind(this)}><FaAngleRight /></Button>
        </Col>
      </Row>
    );
  }
}

export default RoundPicker;
