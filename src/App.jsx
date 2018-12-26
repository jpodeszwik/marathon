import React, { Component } from 'react';
import './App.css';
import LogIn from './components/auth/LogIn';
import UserInfo from './components/auth/UserInfo';
import { onUserChange } from './services/firebase';
import Router from './components/router/Router';

class App extends Component {
  constructor() {
    super();
    this.state = { user: null };

    onUserChange((user) => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <div>
        {this.state.user ?
          <div>
            <UserInfo user={this.state.user} />
            <Router />
          </div> :
          <LogIn />
        }
      </div>
    );
  }
}

export default App;
