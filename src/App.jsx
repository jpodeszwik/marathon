import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import LogIn from './components/auth/LogIn';
import UserInfo from './components/auth/UserInfo';
import { onUserChange } from './services/firebase';
import DrawPrize from './components/prize/DrawPrize';
import RegistrationPage from './components/registration/RegistrationPage';
import Results from './components/results/Results';
import CheckParticipants from './components/checkParticipants/CheckParticipants';

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
            <BrowserRouter>
              <div>
                <Navbar />
                <Route exact path="/" component={RegistrationPage} />
                <Route path="/prize" component={DrawPrize} />
                <Route path="/results" component={Results} />
                <Route path="/check-participants" component={CheckParticipants} />
              </div>
            </BrowserRouter>
          </div> :
          <LogIn />
        }
      </div>
    );
  }
}

export default App;
