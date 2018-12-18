import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/Registration'
import { Navbar } from './components/Navbar'



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route path="/Register" component={ Registration } />
        </div>
       
      </BrowserRouter>
    );
  }
}

export default App;
