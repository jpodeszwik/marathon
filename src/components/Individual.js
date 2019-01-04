import React, { Component } from 'react';
import './individual.css';
import Navbar from './navbar'

class individual extends Component{
  constructor(props){
    super(props);
    this.state = {
      userId: "",
      userRank: ""
    }
  }

  handleInput = (e) => {
    this.setState({
      userId: e.target.value
    })
    
  }

  handleSubmit =(e)=> {
    this.setState({
      userRank: this.state.userId,
      userId: ""
    });
    document.getElementById('score-board').classList.remove('hidden');
    
      document.getElementById('fights-count').classList.remove('hidden')
      
    e.preventDefault();
  }



  render(){
    const sortedRank = this.props.rank.sort((a, b) =>{return a.content.totalFights < b.content.totalFights ? 1 : a.content.totalFights > b.content.totalFights ? -1 : 0})
    
    const currentUserPosition = this.state.userRank === "" ? null : sortedRank.findIndex(item => item.key === this.state.userRank.toString());
   
    let userCheck = this.state.userRank === "" ? false : this.props.rank.filter(item => item.key === this.state.userRank.toString()).length === 0 ? false : true;

    const currentRoundsCount = userCheck === false ? null : this.props.rank.filter(item => item.key === this.state.userRank.toString())[0].content.totalFights;
    
    return(
      <div className="ind-box">
      <Navbar />
      <div className="App-logo-ind"></div>
      <h4>SPRAWDŹ SWÓJ WYNIK</h4>
     
      <div id="ind-container" >
      
     

      <div className="score">
       
          <input onChange={this.handleInput} value={this.state.userId} autoComplete="off" name="input" id="input"/> 
       
      </div>
      <h5>Wpisz swój nr ID</h5>

      <button className="score" onClick={this.handleSubmit}  type="submit" htmlFor="input" id="checkScore"><h5>Sprawdź</h5></button>
      
      </div>
      <div className="score hidden" id="score-board">
        {this.state.userRank === "" ? null : currentUserPosition === -1 ? 
         <h5 className="user-data">Ranking: brak danych</h5> :
        <h5 className="user-data">Nr {currentUserPosition + 1}  w rankingu </h5>} 
      </div>
      <div className="score hidden" id="fights-count">
        {userCheck ? <h5 className="user-data">Stoczone rundy: {currentRoundsCount}</h5> : 
                      <h5 className="user-data">Rundy: brak danych</h5>}
      </div>
    </div>
    );
  }
}

export default individual;
