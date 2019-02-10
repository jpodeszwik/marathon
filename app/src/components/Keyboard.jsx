import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const colStyle = {
  padding: '1px',
};

const Keyboard = props => {
  const [number, setNumber] = useState('');

  const buttonClicked = num => {
    setNumber(number.concat(num));
  };

  const addClicked = () => {
    if (number === '') {
      return;
    }

    props.onSave(number);
    setNumber('');
  };

  const deleteClicked = () => {
    setNumber(number.slice(0, -1));
  };

  return (
    <Container>
      <Row>
        <Col />
        <Col>
          <h1 className="text-center">{number || '-'}</h1>
        </Col>
        <Col>
          <Button block={true} color="danger" onClick={deleteClicked}>
            Popraw
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(1)}>
            1
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(2)}>
            2
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(3)}>
            3
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(4)}>
            4
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(5)}>
            5
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(6)}>
            6
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(7)}>
            7
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(8)}>
            8
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(9)}>
            9
          </Button>
        </Col>
      </Row>
      <Row>
        <Col style={colStyle} />
        <Col style={colStyle}>
          <Button block={true} onClick={() => buttonClicked(0)}>
            0
          </Button>
        </Col>
        <Col style={colStyle}>
          <Button block={true} color="success" onClick={addClicked}>
            Dodaj
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

Keyboard.propTypes = {
  onSave: PropTypes.func,
};

export default Keyboard;
