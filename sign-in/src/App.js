import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/Registration';
import { Navbar } from './components/Navbar';
import LogIn from './components/LogIn';
import UserInfo from './components/UserInfo';
import { onUserChange } from './services/firebase';


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
      <BrowserRouter>
        <div>
          {this.state.user ?
            <div>
              <UserInfo user={this.state.user} />
              <Navbar />
              <Route path="/Register" component={Registration} />
            </div> :
            <LogIn />
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
