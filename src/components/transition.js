import React, { Component } from 'react';
import { CSSTransitionGroup, CSSTransition } from 'react-transition-group';
import { Button } from 'react-bootstrap';
import  uuid  from 'uuid';

class Transition extends Component{
    constructor(props){
        super(props);
        this.state = ({
            items: [{id: uuid(), text: "jeden"},
            {id: uuid(), text: "dwa"},
            {id: uuid(), text: "trzy"},
            {id: uuid(), text: "cztery"}]
        })

    }
   
    render(){
        const { items } = this.state;
        return(
           <CSSTransitionGroup >
               {items.map(({id, text})=>(
               <CSSTransition key={id}>{text}<Button onClick={()=>{
        this.setState({
            items: this.state.items.filter(item => item.id !== id)
        })
    }}>X</Button></CSSTransition>))}
           </CSSTransitionGroup> 
        );
    }
}

export default Transition;