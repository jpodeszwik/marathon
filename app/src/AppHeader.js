import React, { Component } from 'react';
import './AppHeader.css';

class AppHeader extends Component {
  render(){
    return (
      <header className="AppHeader-header">
        <center className="AppHeader-center">
          <span className="AppHeader-span">
            Marathon
          </span>
        </center>
      </header>
    );
  }
}

export default AppHeader;
