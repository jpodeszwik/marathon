import React from 'react';
import PropTypes from 'prop-types';

function UserList(props) {
  return (<div className='container'>
    <table border='true' className='table'>
      <th>Full name</th><th>City</th><th>Bjj Grade</th><th>Home club</th><th>Adult</th><th>Sex</th><th>Active</th><th>Fights</th>
      {
        props.users.map((user, key) => (
          <tr key={key}>
            <td>{user.fullName}</td>
            <td>{user.city}</td>
            <td>{user.bjjGrade}</td>
            <td>{user.homeClub}</td>
            <td>{user.adult}</td>
            <td>{user.sex}</td>
            <td>{user.active ? 'Yes' : 'No'}</td>
            <td>{user.fights ? user.fights : 0}</td>
          </tr>
        ))
      }
    </table>
  </div>);
}

UserList.propTypes = {
  users: PropTypes.array,
};

export default UserList;
