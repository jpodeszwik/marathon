import React, { Component } from 'react';
import { Button, Container, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

export default class ParticipantsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { filteredNumbers: [], number: '' };
    this.onFilterChange = props.onFilterChange;

    this.setNumber = this.setNumber.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFromFilter = this.removeFromFilter.bind(this);
  }

  setNumber(ev) {
    this.setState({ number: ev.target.value });
  }

  removeFromFilter(index) {
    const filteredNumbers = this.state.filteredNumbers.slice();
    filteredNumbers.splice(index, 1);
    this.setState({ filteredNumbers });
    this.onFilterChange(filteredNumbers);
  }

  addFilter() {
    const number = this.state.number;
    const filteredNumbers = this.state.filteredNumbers.slice();
    if (!filteredNumbers.includes(number)) {
      filteredNumbers.push(this.state.number);
    }
    this.setState({ filteredNumbers, number: '' });
    this.onFilterChange(filteredNumbers);
  }

  render() {
    return (
      <Container>
        <InputGroup>
          <Input placeholder="numer" onChange={this.setNumber} value={this.state.number} />
          <Button onClick={this.addFilter}>Dodaj do obserwowanych</Button>
        </InputGroup>
        <br />
        <ListGroup>
          {this.state.filteredNumbers.map((number, index) =>
            <ListGroupItem key={number}>{number} <Button color="danger" onClick={() => this.removeFromFilter(index)}>X</Button></ListGroupItem>
          )}
        </ListGroup>
      </Container>
    );
  }
}

ParticipantsFilter.propTypes = {
  onFilterChange: PropTypes.func,
};
