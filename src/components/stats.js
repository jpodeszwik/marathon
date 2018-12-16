import React, { Component } from 'react';

class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            userNumber: ""
        }
    }

    handleChange=(event)=>{
        // event.preventDefault();
        this.setState({userId: event.target.value})
    }

    handleSubmit=(event)=>{
        
        this.setState({userNumber: this.state.userId,
        userId: ""});
        event.preventDefault();
        console.log(this.state.userNumber)
        
    }
    render(){
        return(
        
            <div>
            <form onSubmit={this.handleSubmit}>
                <input id="input" value={this.state.userId} onChange={this.handleChange}  />
            </form>
            
            <ul>
                {this.props.msg}
        
             
               {<li>{this.props.state.filter(item => item.content[this.state.userNumber] === 1).length}</li>}
              {<li>{<ol>{this.props.state.filter(item => item.content[this.state.userNumber] === 1).map( i => <li key={i.key}>{i.key}</li>)}</ol>}</li>} 
            </ul>  
    
           </div>
        );
    }
    }
    

export default Stats;