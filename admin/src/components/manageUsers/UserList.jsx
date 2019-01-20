import React from 'react';
import PropTypes from 'prop-types';
import YesNoButton from './YesNoButton';
import { setRegisterFights, setRegisterParticipants, setManageUsers } from '../../services/users';

const setUserValueCb = (user, fn) => {
  return val => fn(user.id, val);
};

const UserList = props => {
  return (
    <table border='true' className='table' style={{ textAlign: 'center' }}>
      <thead>
        <tr>
          <th>email</th><th>zapis walk</th><th>rejestracja uczestników</th><th>zarządzanie użytkownikami</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (<tr key={user.id}>
          <td>{user.email}</td>
          <td><YesNoButton selected={user.registerFights} onSelect={setUserValueCb(user, setRegisterFights)} /></td>
          <td><YesNoButton selected={user.registerParticipants} onSelect={setUserValueCb(user, setRegisterParticipants)} /></td>
          <td><YesNoButton selected={user.manageUsers} onSelect={setUserValueCb(user, setManageUsers)} /></td>
        </tr>))}
      </tbody>
    </table >
  );
};

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;