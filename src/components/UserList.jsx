import React from 'react';
import PropTypes from 'prop-types';

function UserList(props) {
  return (<div className='container'>
    <table border='true' className='table'>
      <thead>
        <tr>
          <th>Numer startowy</th><th>Imię</th><th>Miasto</th><th>Pas BJJ</th><th>Klub</th><th>Dorosły</th><th>Płeć</th><th>Aktywny</th><th>Walki</th>
        </tr>
      </thead>
      <tbody>
        {
          props.users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.city}</td>
              <td>{user.bjjGrade}</td>
              <td>{user.homeClub}</td>
              <td>{user.adult}</td>
              <td>{user.sex}</td>
              <td>{user.active ? 'Tak' : 'Nie'}</td>
              <td>{user.fights ? user.fights : 0}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>);
}

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
