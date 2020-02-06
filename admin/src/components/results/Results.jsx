import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { subscribeForResults, unsubscribeFromResults } from './resultsApi';
import ParticipantsTable from '../ParticipantsTable';

const Results = () => {
  const [top3men, setTop3men] = useState([]);
  const [top3women, setTop3women] = useState([]);
  const [totalFights, setTotalFights] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    const listener = subscribeForResults(topResults => {
      const { top3men, top3women, totalFights, totalParticipants } = topResults;
      setTop3men(top3men);
      setTop3women(top3women);
      setTotalFights(totalFights);
      setTotalParticipants(totalParticipants);
    });

    return () => {
      unsubscribeFromResults(listener);
    };
  }, []);

  return (
    <Container>
      <center>
        <h1>top 3 mężczyzn</h1>
        <ParticipantsTable participants={top3men} />
        <h1>top 3 kobiet</h1>
        <ParticipantsTable participants={top3women} />
        <h1>Liczba walk</h1>
        <h2>{totalFights}</h2>
        <h1>Liczba uczestników</h1>
        <h2>{totalParticipants}</h2>
      </center>
    </Container>
  );
};

export default Results;
