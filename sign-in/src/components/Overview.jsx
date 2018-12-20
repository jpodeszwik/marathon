import React, { Component } from 'react';

import UserList from './UserList';

import { listUsers } from '../services/users';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    listUsers().then(users => this.setState({ users }));
  }

  render() {
    return (
      <UserList users={this.state.users} />
    );
  }
}
        
export default Overview;
