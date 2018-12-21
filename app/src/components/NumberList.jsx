import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';


function NumberList(props) {
  const { numbers, onRemoveNumber } = props;

  return <ListGroup style={{ paddingTop: '20px' }}>
    {numbers.map((number, key) => (
      <ListGroupItem key={key}>
        <span style={{ fontSize: '25px' }}>{number}</span>
        <Button style={{ float: 'right' }} onClick={() => onRemoveNumber(number)} color="danger">X</Button>
      </ListGroupItem>
    ))}
  </ListGroup>;
}

NumberList.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.string),
  onRemoveNumber: PropTypes.func,
};

export default NumberList;
