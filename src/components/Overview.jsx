import React, { Component } from 'react';

import UserList from './UserList';

import { subscribeForUsers, unsubscribeForUsers } from '../services/users';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.listener = subscribeForUsers(users => this.setState({ users }));
  }

  componentWillUnmount() {
    unsubscribeForUsers(this.listener);
  }

  render() {
    return (
      <UserList users={this.state.users} />
    );
  }
}

export default Overview;
