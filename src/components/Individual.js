import React from 'react';
import './individual.css';
import Navbar from './navbar'


const Individual =(props)=>{
  const checkScore = () => {
    let val = document.getElementById('input').value;
    console.log(val)
    val = "";
    console.log(props.rank[8].content.firstName)
  }
    return(
      <div className="ind-box">
        <Navbar />
        <div className="App-logo-ind"></div>
        <h4>SPRAWDŹ SWÓJ WYNIK</h4>
        
        <div id="ind-container" >
        

        <div className="score"><input autoComplete="off" name="input" id="input"/></div>
        <h5>Wpisz swój nr ID</h5>

        <button onClick={checkScore} className="score" type="submit" htmlFor="input" id="checkScore"><h5>Sprawdź</h5></button>
        
                  
        </div>
      </div>
    );
}

export default Individual;