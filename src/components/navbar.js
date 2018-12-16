import React from 'react';
import './Navbar.css';

const Navbar =()=>{
    return(
        <div className="navbar" >
            <a href="/" id="navHome" className="nav">Home</a>
            <a href="/stats" id="navStats" className="nav">Statystyki</a>
        </div>
    );
}

export default Navbar;