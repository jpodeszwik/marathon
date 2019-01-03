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
    })
    e.preventDefault();
  }



  render(){
    const sortedRank = this.props.rank.sort((a, b) =>{return a.content.totalFights < b.content.totalFights ? 1 : a.content.totalFights > b.content.totalFights ? -1 : 0})
    
    const currentUserPosition = this.state.userRank === "" ? null : sortedRank.findIndex(item => item.key === this.state.userRank.toString());
    
    return(
      <div className="ind-box">
      <Navbar />
      <div className="App-logo-ind"></div>
      <h4>SPRAWDŹ SWÓJ WYNIK</h4>
      {this.state.userRank === "" ? null : <h5>Jestes {currentUserPosition + 1}  w rankingu</h5>}
      <div id="ind-container" >
      

      <div className="score">
       
          <input onChange={this.handleInput} value={this.state.userId} autoComplete="off" name="input" id="input"/> 
       
      </div>
      <h5>Wpisz swój nr ID</h5>

      <button className="score" onClick={this.handleSubmit}  type="submit" htmlFor="input" id="checkScore"><h5>Sprawdź</h5></button>
      
                
      </div>
    </div>
    );
  }
}

export default individual;
