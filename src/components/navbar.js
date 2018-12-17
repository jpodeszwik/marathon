import React from 'react';
import './Navbar.css';
import { ButtonToolbar, Button } from 'react-bootstrap';

const Navbar =()=>{
    return(
        <div className="navbar" >
            <ButtonToolbar>
                <Button href="/">Home</Button>
                <Button href="/stats">Stats</Button>
            </ButtonToolbar>
        </div>
    );
}

export default Navbar;