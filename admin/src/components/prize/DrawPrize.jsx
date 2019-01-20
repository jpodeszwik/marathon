import React, { Component } from 'react';
import { listFighters } from '../../services/users';
import { getParticipant } from '../../services/participantRepository';
import { Button, Container, Row } from 'reactstrap';
import RoundPicker from './RoundPicker';

class DrawPrize extends Component {
  constructor(props) {
    super(props);
    this.state = { round: new Date(), fighters: 0, winner: null };
    this.roundSelected = this.roundSelected.bind(this);
    this.doDrawPrize = this.doDrawPrize.bind(this);
  }

  roundSelected(date) {
    listFighters(date).then(fighters => {
      this.setState({ round: date, fighters: fighters.length, winner: null });
    });
  }

  doDrawPrize() {
    listFighters(this.state.round)
      .then(fighters => fighters[Math.floor(Math.random() * fighters.length)])
      .then(winnerId => getParticipant(winnerId))
      .then(details => details && this.setState({ winner: `${details.fullName} (${details.id})` }));
  }

  render() {
    return (
      <Container>
        <center>
          <RoundPicker onRoundSelected={this.roundSelected} />
          <Row><span>Liczba zawodników: {this.state.fighters}</span></Row>
          <Row><Button onClick={this.doDrawPrize}>Losuj</Button></Row>
          <Row><span>Zwycięzca: {this.state.winner}</span></Row>
        </center>
      </Container>
    );
  }
}

export default DrawPrize;
