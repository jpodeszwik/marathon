import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import LogIn from './components/LogIn';
import UserInfo from './components/UserInfo';
import { onUserChange } from './services/firebase';
import MainPage from './components/MainPage';
import DrawPrize from './components/DrawPrize';


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
                <Route path="/prize" component={DrawPrize} />
                <Route exact path="/" component={MainPage} />
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
