import React from 'react';
import './home.css';


const Home =()=>{
    return(
      <div className="home-box">
        <div className="App-logo"></div>

        <div id="home-container" >
        
            <a href="/general" className="home-anchor">Ranking ogólny</a>
            <a href="/" className="home-anchor">Top 5 uczestników</a>
            <a href="/" className="home-anchor">Top 3 kobiety</a>
            <a href="/individual" className="home-anchor">Sprawdź swój wynik</a>
            <a href="/" className="home-anchor">Harmonogram</a>
            <a href="/" className="home-anchor">Regulamin</a>       
        </div>
      </div>
    );
}

export default Home;