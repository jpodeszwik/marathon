import React, { Component } from 'react';
import './App.css';
import { config } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {
  constructor(){
    super();
    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('rounds');
    this.state = {
      fights: []
    }
  }

  componentWillMount(){
    const previousFights = this.state.fights;

    this.database.on('child_added', snap => previousFights.push(snap));
    this.setState({fights: previousFights})
    console.log(this.state.fights);
  }
  render() {
    return (
      <div className="App">
      aaaa
      </div>
    );
  }
}

export default App;
