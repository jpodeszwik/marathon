import React from 'react';
import PropTypes from 'prop-types';

function NumberList(props) {
  return <div>
    {props.numbers.map((number, key) => <div key={key}>{number}</div>)}
  </div>;
}

NumberList.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.string),
};

export default NumberList;
