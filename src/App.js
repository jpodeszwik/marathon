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

  // componentWillMount(){
  //   const previousFights = this.state.fights;
    

  //   this.database.on('child_added', snap => previousFights.push({
  //     key: snap.key,
  //     content: snap.val(),
  //   }));
    
  //   this.setState({fights: previousFights})
    
  // }
  componentDidMount(){

    this.database.once('value').then(snapshot => {
 
      const value = snapshot.val();
 
      const fights = Object.keys(value).map(key => ({
 
        key: key,
 
        content: value[key]
 
      }))
 
      return fights
 
    }).then(
 
      fights => this.setState({ fights: fights })
 
    )
 
  }

  render() {
    return (
      <div className="App">
        <ul>
          {console.log(this.state.fights)}
          {/* {console.log(this.state.fights.length)} */}
          {this.state.fights.map((fight)=>{return (<li key={fight.key}>{fight.content[0]}</li>)})}

        </ul>
      </div>
    );
  }
}

export default App;
