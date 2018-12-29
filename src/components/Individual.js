import React, { Component } from 'react';
import './individual.css';
import Navbar from './navbar'

class individual extends Component{
  constructor(){
    super();
    this.state = {
      userId: "",
      rank: ""
    }
  }

  handleInput = (e) => {
    this.setState({
      userId: e.target.value
    })
    
  }

  handleSubmit =(e)=> {
    this.setState({
      rank: this.state.userId,
      userId: ""
    })
    e.preventDefault();
    console.log(this.state.userId)
  }



  render(){
    return(
      <div className="ind-box">
      <Navbar />
      <div className="App-logo-ind"></div>
      <h4>SPRAWDŹ SWÓJ WYNIK</h4>
      {this.state.rank === "" ? null : <p>`jestes ktorys w rankingu`</p>}
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
