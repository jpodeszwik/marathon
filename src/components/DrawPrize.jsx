import React, { Component } from 'react';
import { listFighters } from '../services/users';
import { Button, Container, Row } from 'reactstrap';
import RoundPicker from './RoundPicker';

class DrawPrize extends Component {
  constructor(props) {
    super(props);
    this.round = new Date();
    this.state = { fighters: [], winner: null };
    this.roundSelected = this.roundSelected.bind(this);
    this.randomizePrize = this.randomizePrize.bind(this);
  }

  roundSelected(date) {
    listFighters(date).then((fighters) => {
      this.setState({ fighters : fighters, winner: null });
    });
  }

  randomizePrize() {
    const fighters = this.state.fighters;
    const winner = fighters[Math.floor(Math.random()*fighters.length)];
    this.setState({ winner });
  }

  render() {
    return (
      <Container>
        <center>
          <RoundPicker onRoundSelected={this.roundSelected} />
          <Row><span>Liczba zawodników: {this.state.fighters.length}</span></Row>
          <Row><Button onClick={this.randomizePrize}>Losuj</Button></Row>
          <Row><span>Zwycięzca: {this.state.winner}</span></Row>
        </center>
      </Container>
    );
  }
}

export default DrawPrize;
