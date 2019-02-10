import React, { useState } from 'react';
import { Button, Container, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

const ParticipantsFilter = props => {
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [number, setNumber] = useState('');

  const removeFromFilter = index => {
    const filteredNumbersCopy = filteredNumbers.slice();
    filteredNumbersCopy.splice(index, 1);
    setFilteredNumbers(filteredNumbersCopy);
    props.onFilterChange(filteredNumbersCopy);
  };

  const addFilter = () => {
    const filteredNumbersCopy = filteredNumbers.slice();
    if (!filteredNumbersCopy.includes(number)) {
      filteredNumbersCopy.push(number);
    }

    setFilteredNumbers(filteredNumbersCopy);
    setNumber('');
    props.onFilterChange(filteredNumbersCopy);
  };

  return (
    <Container>
      <InputGroup>
        <Input placeholder="numer" onChange={ev => setNumber(ev.target.value)} value={number} />
        <Button onClick={addFilter}>Dodaj do obserwowanych</Button>
      </InputGroup>
      <br />
      <ListGroup>
        {filteredNumbers.map((number, index) => (
          <ListGroupItem key={number}>
            {number}{' '}
            <Button color="danger" onClick={() => removeFromFilter(index)}>
              X
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

ParticipantsFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default ParticipantsFilter;
