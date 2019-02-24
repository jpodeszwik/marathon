import React from 'react';
import PropTypes from 'prop-types';
import YesNoButton from './YesNoButton';
import { toggleRegisterParticipants, toggleRegisterFights, toggleManageUsers } from 'marathon-lib/src/auth';

const setUserValueCb = (user, fn) => {
  return val => fn(user.id, val);
};

const UserList = props => {
  return (
    <table border="true" className="table" style={{ textAlign: 'center' }}>
      <thead>
        <tr>
          <th>email</th>
          <th>zapis walk</th>
          <th>rejestracja uczestników</th>
          <th>zarządzanie użytkownikami</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>
              <YesNoButton selected={user.registerFights} onSelect={setUserValueCb(user, toggleRegisterFights)} />
            </td>
            <td>
              <YesNoButton selected={user.registerParticipants} onSelect={setUserValueCb(user, toggleRegisterParticipants)} />
            </td>
            <td>
              <YesNoButton selected={user.manageUsers} onSelect={setUserValueCb(user, toggleManageUsers)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
