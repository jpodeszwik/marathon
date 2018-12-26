import React, { Component } from 'react';
import './App.css';
import LogIn from './components/auth/LogIn';
import UserInfo from './components/auth/UserInfo';
import { onUserChange } from './services/firebase';
import { getLoggedInUserPermissions } from './services/users';
import Router from './components/router/Router';
import { Alert } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = { user: null, permissions: {} };

    onUserChange((user) => {
      if (!user) {
        this.setState({ user, permissions: {} });
        return;
      }

      getLoggedInUserPermissions()
        .then(permissions => this.setState({ user, permissions }));
    });
  }

  render() {
    return (
      <div>
        {this.state.user ?
          <UserInfo user={this.state.user} /> :
          <LogIn />
        }
        {this.state.user && !this.state.permissions.registerParticipants &&
          <Alert color="danger" fade={false}>Brak uprawnień. Skontaktuj się z administratorem</Alert>
        }
        {this.state.user && this.state.permissions.registerParticipants &&
          <Router canManageUsers={this.state.permissions.manageUsers} />
        }
      </div>
    );
  }
}

export default App;
