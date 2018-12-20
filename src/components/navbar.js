import React from 'react';
import './Navbar.css';
import { ButtonGroup, Button, Grid, Row, Col } from 'react-bootstrap';

const Navbar =()=>{
    return(
        <Grid >
          <Row className="nav-row">
              <Col xs={10} xsOffset={1}>
                <ButtonGroup>
                    <Button href="/">Home</Button>
                    <Button href="/stats">Stats</Button>
                    <Button bsStyle="primary" href="/trans">opcja</Button>
                    <Button bsStyle="primary">opcja2</Button>
                </ButtonGroup>
              </Col>
          </Row>
        </Grid>
    );
}

export default Navbar;