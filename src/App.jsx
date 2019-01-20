import React, { Component } from 'react';
import './App.css';
import LogIn from './components/auth/LogIn';
import UserInfo from './components/auth/UserInfo';
import { onUserChange } from './services/firebase';
import { getLoggedInUserPermissions } from './services/users';
import Router from './components/router/Router';
import { Alert } from 'reactstrap';
import {FadeLoader} from 'react-spinners';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, permissions: {}, loading: false };

    onUserChange((user) => {
      this.setState({ user, permissions: {} });
      if(user) {
        this.setState({loading: true});
        getLoggedInUserPermissions()
          .then(permissions => this.setState({ permissions }))
          .finally(() => this.setState({loading: false}));
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ?
          <UserInfo user={this.state.user} /> :
          <LogIn />
        }
        <div style ={{ width: '50px', margin: 'auto' }}>
          <FadeLoader loading={this.state.loading}/>
        </div>
        {this.state.user && !this.state.permissions.registerParticipants && !this.state.loading &&
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
