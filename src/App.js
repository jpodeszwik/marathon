import React, { Component } from 'react';
import './App.css';
import { config } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import Stats from './components/stats';
import Navbar from './components/navbar'


class App extends Component {
  constructor(props){
    super(props);
    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('rounds');
    this.state = {
      fights: [],
      msg: "hello"
    }
   
  }

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
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path ="/" component={Home} />
          <Route path ="/stats" render={(props) => <Stats {...props} msg={this.state.msg} state={this.state.fights}/>} />
        </div>
      </BrowserRouter>
 
    );
  }
}

export default App;
