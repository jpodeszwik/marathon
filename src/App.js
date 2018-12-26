import React, { Component } from 'react';
import './App.css';
import { config } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import Stats from './components/stats';
import Navbar from './components/navbar';
import Trans from './components/transition';
import General from './components/General'


class App extends Component {
  constructor(props){
    super(props);
    this.app = firebase.initializeApp(config);
    this.rank = this.app.database().ref().child('ranking');
    this.rounds = this.app.database().ref().child('fights');
    this.state = {
      fights: [],
      rounds: [],
     
        
    }
   
  }

  componentDidMount(){

    this.rank.once('value').then(snapshot => {
 
      const value = snapshot.val();
 
      const fights = Object.keys(value).map(key => ({
 
        key: key,
 
        content: value[key]
 
      }))
      
      return fights

      
 
    }).then(
 
      fights => this.setState({ fights: fights })
 
    )
   
    this.rounds.once('value').then(snapshot => {
 
      const value = snapshot.val();
 
      const rounds = Object.keys(value).map(key => ({
 
        key: key,
 
        content: value[key]
 
      }))
      
      return rounds

      
 
    }).then(
 
      rounds => this.setState({ rounds: rounds })
 
    )
    
    // this.users.once('value').then(snapshot => {
 
    //   const value = snapshot.val();
 
    //   const users = Object.keys(value).map(key => ({
 
    //     key: key,
 
    //     content: value[key]
 
    //   }))
      
    //   return users

      
 
    // }).then(
 
    //   users => this.setState({ users: users })
      
    // )
      
  }

  

  render() {  
    return (
      <BrowserRouter>
        <div className="container">
          
          
          <Route exact path ="/" component={Home} />
          <Route path ="/stats" render={(props) => <Stats {...props}  rank={this.state.fights} rounds={this.state.rounds}/>} />
          <Route path ="/trans" component={Trans} />
          <Route path ="/general" render={(props) => <General
            {...props}  
            rank={this.state.fights} 
            rounds={this.state.rounds}
          />} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
