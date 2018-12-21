import React from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return(
    <Grid>
      <Row className="navBar">
        <Col sm={12}>
          <ButtonGroup>
            <Link to="/Register"><Button>Panel rejestracji</Button></Link>
            <Link to="/"><Button>Podglad</Button></Link>
          </ButtonGroup>
        </Col>
      </Row>
    </Grid>
  );
};