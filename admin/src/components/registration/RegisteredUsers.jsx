import React, { Component } from 'react';

import UserList from './UserList';

import { subscribeForParticipants, unsubscribeForParticipants } from '../../services/participantRepository';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.listener = subscribeForParticipants(users => this.setState({ users }));
  }

  componentWillUnmount() {
    unsubscribeForParticipants(this.listener);
  }

  render() {
    return (
      <UserList users={this.state.users} />
    );
  }
}

export default Overview;
