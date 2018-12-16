import React, { Component } from 'react';
import './Stats.css';

class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            userNumber: ""
        }
    }

    handleChange=(event)=>{
        
        this.setState({userId: event.target.value})
    }

    handleSubmit=(event)=>{
        
        this.setState({userNumber: this.state.userId,
        userId: ""});
        event.preventDefault();
        
    }
    render(){
        return(
        
            <div>
            <form onSubmit={this.handleSubmit}>
                <input id="input" value={this.state.userId} onChange={this.handleChange}  />
            </form>
            
            {<h5>Zawodnik z numerem {this.state.userNumber} stoczyl {this.props.state.filter(item => item.content[this.state.userNumber] === 1).length} walk</h5>}
            <ul className="fightsList">
                {/* {this.props.msg} */}
        
             
               
              {<li>{<ol>{this.props.state.filter(item => item.content[this.state.userNumber] === 1).map( i => <li key={i.key} className="dates">{i.key}</li>)}</ol>}</li>} 
            </ul>  
    
           </div>
        );
    }
    }
    

export default Stats;