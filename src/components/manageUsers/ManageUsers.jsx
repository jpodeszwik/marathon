import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { listUsers } from '../../services/users';
import UserList from './UserList';

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    listUsers().then(users => this.setState({ users }));
  }

  render() {
    return (
      <Container>
        <UserList users = {this.state.users}/>
      </Container>
    );
  }
}

export default ManageUsers;
