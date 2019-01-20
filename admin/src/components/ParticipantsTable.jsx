import React from 'react';
import PropTypes from 'prop-types';

export default function ParticipantsTable(props) {
  const participants = props.participants;
  return <table border='true' className='table'>
    <thead>
      <tr>
        <th>Miejsce</th><th>Numer startowy</th><th>Imię</th><th>Ilość walk</th>
      </tr>
    </thead>
    <tbody>
      {participants.map((participant) =>
        <tr key={participant.id}>
          <td>{participant.place}</td><td>{participant.id}</td><td>{participant.data.fullName}</td><td>{participant.fights}</td>
        </tr>
      )}
    </tbody>
  </table>;
}

ParticipantsTable.propTypes = {
  participants: PropTypes.array,
};
