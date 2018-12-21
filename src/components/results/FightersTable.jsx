import React from 'react';
import PropTypes from 'prop-types';

export default function FightersTable(props) {
  const fighters = props.fighters;
  return <table border='true' className='table'>
    <thead>
      <tr>
        <th>Miejsce</th><th>Numer startowy</th><th>Imię</th><th>Ilość walk</th>
      </tr>
    </thead>
    <tbody>
      {fighters.map((fighter, index) =>
        <tr key={fighter.id}>
          <td>{index + 1}</td><td>{fighter.id}</td><td>{fighter.fullName}</td><td>{fighter.fights}</td>
        </tr>
      )}
    </tbody>
  </table>;
}

FightersTable.propTypes = {
  fighters: PropTypes.array,
};
