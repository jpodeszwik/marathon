import React, { Component } from 'react';
import './App.css';
import { config } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {
  constructor(props){
    super(props);
    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('rounds');
    this.state = {
      fights: []
    }
   
  }

  componentWillMount(){
    const previousFights = this.state.fights;
    

    this.database.on('child_added', snap => previousFights.push({
      key: snap.key,
      content: snap.val(),
    }));
    
    this.setState({fights: previousFights})
    
  }


  render() {
    return (
      <div className="App">
        <ul>
          {console.log(this.state.fights)}
          {this.state.fights.map((fight)=>{return (<li>{fight.key}</li>)})}

        </ul>
      </div>
    );
  }
}

export default App;
