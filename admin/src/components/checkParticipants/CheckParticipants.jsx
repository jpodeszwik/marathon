import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { subscribeForParticipantsResults, unsubscribeForParticipantsResults } from '../../services/users';
import ParticipantsTable from '../ParticipantsTable';
import ParticipantsFilter from './ParticipantsFilter';

const CheckParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);

  const displayableParticipants = () => participants.filter(participant => filteredNumbers.includes(participant.id));

  useEffect(() => {
    const listener = subscribeForParticipantsResults(setParticipants);
    return () => {
      unsubscribeForParticipantsResults(listener);
    };
  }, []);

  return (
    <Container>
      <center>
        <ParticipantsFilter onFilterChange={setFilteredNumbers} />
        <ParticipantsTable participants={displayableParticipants()} />
      </center>
    </Container>
  );
};

export default CheckParticipants;
