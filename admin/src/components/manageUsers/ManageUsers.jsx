import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { subscribeForListUsers, unsubscribeFromListUsers } from '../../services/users';

import UserList from './UserList';

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    this.listener = subscribeForListUsers(users => this.setState({ users }));
  }

  componentWillUnmount() {
    unsubscribeFromListUsers(this.listener);
  }

  render() {
    return (
      <Container>
        <UserList users={this.state.users} />
      </Container>
    );
  }
}

export default ManageUsers;
