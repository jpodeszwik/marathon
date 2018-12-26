import React from 'react';
import PropTypes from 'prop-types';

const UserList = props => {
  return (
    <table border='true' className='table'>
      <thead>
        <tr>
          <th>email</th><th>zapis walk</th><th>rejestracja uczestników</th><th>zarządzanie użytkownikami</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (<tr key={user.email}>
          <td>{user.email}</td>
          <td>{user.registerFights ? 'TAK' : 'NIE'}</td>
          <td>{user.registerParticipants ? 'TAK' : 'NIE'}</td>
          <td>{user.manageUsers ? 'TAK' : 'NIE'}</td>
        </tr>) )}
      </tbody>
    </table>);
};

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;