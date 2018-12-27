import React from 'react';
import './individual.css';
import Navbar from './navbar'


const Individual =()=>{
    return(
      <div className="ind-box">
        <Navbar />
        <div className="App-logo-ind"></div>
        <h4>SPRAWDŹ SWÓJ WYNIK</h4>
        <div id="ind-container" >
        

        <div className="score"><input /></div>
        <h5>Wpisz swój nr ID</h5>

        <div className="score"><h5>Sprawdź</h5></div>
        
                  
        </div>
      </div>
    );
}

export default Individual;