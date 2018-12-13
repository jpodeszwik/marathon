import React, { Component } from 'react';
import './App.css';
import { config } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import { BrowserRouter, Route } from 'react-router-dom';
import home from './components/home';
import Stats from './components/stats';

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
      <BrowserRouter>
        <div>
          
          <Route exact path ="/" component={home} />
          <Route path ="/stats" render={(props) => <Stats {...props} msg={this.state.msg} state={this.state.fights}/>} />
        </div>
      </BrowserRouter>
      // <div className="App">
      //   <button onClick={()=>window.location.reload()}>X</button>
      //   <ul>
      //     {console.log(this.state.fights)}
      //     {console.log(Object.keys[this.state.fights.content])}
         
      //     {<li>{this.state.fights.filter(item => item.content[55] === 1).length}</li>}
      //     {<li>{<ol>{this.state.fights.filter(item => item.content[55] === 1).map( i => <li key={i.key}>{i.key}</li>)}</ol>}</li>}
      //   </ul>  

      // </div>
    );
  }
}

export default App;
