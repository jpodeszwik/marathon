import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import { subscribeForParticipants } from 'marathon-lib/src/participants';

const Overview = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => subscribeForParticipants(setUsers), []);

  return <UserList users={users} />;
};

export default Overview;
