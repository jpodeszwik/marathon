import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {number: ''};
  }

  buttonClicked(num) {
    this.setState((prevState) => {
      return {number: prevState.number.concat(num)};
    });
  }

  addClicked() {
    this.setState(() => {
      return {number: ''};
    });
  }

  deleteClicked() {
    this.setState((prevState) => {
      return {number: prevState.number.slice(0, -1)};
    });
  }

  render(){
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">{this.state.number || '-'}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 1)}>1</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 2)}>2</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 3)}>3</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 4)}>4</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 5)}>5</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 6)}>6</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 7)}>7</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 8)}>8</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 9)}>9</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block={true} color="danger" onClick={this.deleteClicked.bind(this)}>Delete</Button>
          </Col>
          <Col>
            <Button block={true} onClick={this.buttonClicked.bind(this, 0)}>0</Button>
          </Col>
          <Col>
            <Button block={true} color="success" onClick={this.addClicked.bind(this)}>Add</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Keyboard;
