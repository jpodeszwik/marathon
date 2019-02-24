import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { subscribeForListUsers } from 'marathon-lib/src/auth';

import UserList from './UserList';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => subscribeForListUsers(setUsers), []);

  return (
    <Container>
      <UserList users={users} />
    </Container>
  );
};

export default ManageUsers;
