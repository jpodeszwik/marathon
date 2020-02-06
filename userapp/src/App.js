import React, { Component } from 'react';
import './App.css';
import { config } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import Individual from './components/Individual';
import General from './components/General';
import Schedule from './components/Schedule';
import Info from './components/Info';
import TopThree from './components/TopThree';


class App extends Component {
  constructor(props){
    super(props);
    this.app = firebase.initializeApp(config);
    this.rank = this.app.database().ref().child('ranking');
    this.rounds = this.app.database().ref().child('fights');
    this.state = {
      fights: [],
      rank: []
     
        
    }
   
  }

  componentDidMount(){

    this.rank.once('value').then(snapshot => {
 
      const value = snapshot.val();
 
      const fights = value === null ? {"A": "BRAK DANYCH" } : Object.keys(value).map(key => ({
 
        key: key,
 
        content: value[key]
 
      }))
      
      return fights

      
 
    }).then(
 
      fights => this.setState({ fights: fights })
 
    )
    this.rank.once('value').then(snapshot => {
 
      const value = snapshot.val();
 
      const rank = value === null ? {"A": "BRAK DANYCH" } :  Object.keys(value).map(key => ({
 
        key: key,
 
        content: value[key]
 
      }))
      
      return rank

      
 
    }).then(
 
      rank => this.setState({ rank })
 
    ) 
    
    
      
  }

  


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          
          
          <Route exact path ="/" component={Home} />

          <Route path ="/general" render={(props) => <General
            {...props}
            rank={this.state.rank.slice()}
          />} />

          <Route path ="/individual" render={(props) => <Individual
             {...props}
             rank={this.state.rank.slice()}
          />}/>

          <Route path ="/topmen" render={(props) => <TopThree
             {...props}
             rank={this.state.rank.slice()}
             filter = {item => item.content.sex === "Mężczyzna"}
          />}/>

          <Route path ="/topwomen" render={(props) => <TopThree
             {...props}
             rank={this.state.rank.slice()}
             filter = {item => item.content.sex === "Kobieta"}
          />}/>

          <Route path ="/schedule" component={Schedule}/> 

          <Route path ="/info" component={Info}/> 
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
