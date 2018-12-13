import React from 'react';

const Stats =(props)=> {
    return(
        
        <div>
        <button onClick={()=>window.location.reload()}>X</button>
        <ul>
            {props.msg}
          {console.log(props.state)}
          {/* {console.log(Object.keys[this.props.state.state.fights.content])} */}
         
           {<li>{props.state.filter(item => item.content[55] === 1).length}</li>}
          {<li>{<ol>{props.state.filter(item => item.content[55] === 1).map( i => <li key={i.key}>{i.key}</li>)}</ol>}</li>} 
        </ul>  

       </div>
    );
}

export default Stats;