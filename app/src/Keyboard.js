import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class Keyboard extends Component {
  render(){
    return (
      <Container>
        <Row>
          <Col>
            <Button block="true">1</Button>
          </Col>
          <Col>
            <Button block="true">2</Button>
          </Col>
          <Col>
            <Button block="true">3</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block="true">4</Button>
          </Col>
          <Col>
            <Button block="true">5</Button>
          </Col>
          <Col>
            <Button block="true">6</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block="true">7</Button>
          </Col>
          <Col>
            <Button block="true">8</Button>
          </Col>
          <Col>
            <Button block="true">9</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block="true" color="danger">Delete</Button>
          </Col>
          <Col>
            <Button block="true">0</Button>
          </Col>
          <Col>
            <Button block="true" color="success">Add</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Keyboard;
