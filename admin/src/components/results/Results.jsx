import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { subscribeForResults, unsubscribeFromResults } from './resultsApi';
import ParticipantsTable from '../ParticipantsTable';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top5: [],
      top3women: [],
      totalFights: 0,
      totalParticipants: 0,
    };
  }

  componentDidMount() {
    this.topListener = subscribeForResults(topResults => {
      const { top5, top3women, totalFights, totalParticipants } = topResults;
      this.setState({ top5, top3women, totalFights, totalParticipants });
    });
  }

  componentWillUnmount() {
    unsubscribeFromResults(this.topListener);
  }

  render() {
    return <Container>
      <center>
        <h1>top 5</h1>
        <ParticipantsTable participants={this.state.top5} />
        <h1>top 3 kobiet</h1>
        <ParticipantsTable participants={this.state.top3women} />
        <h1>Liczba walk</h1>
        <h2>{this.state.totalFights}</h2>
        <h1>Liczba uczestników</h1>
        <h2>{this.state.totalParticipants}</h2>
      </center>
    </Container>;
  }
}

export default Results;