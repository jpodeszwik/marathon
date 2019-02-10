import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import { subscribeForParticipants, unsubscribeForParticipants } from '../../services/participantRepository';

const Overview = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listener = subscribeForParticipants(setUsers);

    return () => {
      unsubscribeForParticipants(listener);
    };
  });

  return <UserList users={users} />;
};

export default Overview;
