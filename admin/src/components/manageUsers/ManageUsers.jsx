import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { subscribeForListUsers, unsubscribeFromListUsers } from '../../services/users';

import UserList from './UserList';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listener = subscribeForListUsers(setUsers);
    return () => {
      unsubscribeFromListUsers(listener);
    };
  }, []);

  return (
    <Container>
      <UserList users={users} />
    </Container>
  );
};

export default ManageUsers;
