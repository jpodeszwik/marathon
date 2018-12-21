import React from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return(
    <Container>
      <Row className="navBar">
        <Col sm={12}>
          <ButtonGroup>
            <Link to="/"><Button>Rejestracja</Button></Link>
            <Link to="/prize"><Button>Losowanie nagrody</Button></Link>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};