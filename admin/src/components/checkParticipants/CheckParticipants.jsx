import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { subscribeForParticipantsResults, unsubscribeForParticipantsResults } from '../../services/users';
import ParticipantsTable from '../ParticipantsTable';
import ParticipantsFilter from './ParticipantsFilter';

export default class CheckParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      filteredNumbers: [],
    };

    this.displayableParticipants = this.displayableParticipants.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
  }
  componentDidMount() {
    this.participantListener = subscribeForParticipantsResults(participants => {
      this.setState({ participants });
    });
  }

  componentWillUnmount() {
    unsubscribeForParticipantsResults(this.participantListener);
  }

  displayableParticipants() {
    return this.state.participants.filter(participant => this.state.filteredNumbers.includes(participant.id));
  }

  filterChanged(filteredNumbers) {
    this.setState({ filteredNumbers });
  }

  render() {
    return (
      <Container>
        <center>
          <ParticipantsFilter onFilterChange={this.filterChanged} />
          <ParticipantsTable participants={this.displayableParticipants()} />
        </center>
      </Container>
    );
  }
}
