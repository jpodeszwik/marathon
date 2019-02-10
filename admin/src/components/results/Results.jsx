import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { subscribeForResults, unsubscribeFromResults } from './resultsApi';
import ParticipantsTable from '../ParticipantsTable';

const Results = () => {
  const [top5, setTop5] = useState([]);
  const [top3women, setTop3Women] = useState([]);
  const [totalFights, setTotalFights] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    const listener = subscribeForResults(topResults => {
      const { top5, top3women, totalFights, totalParticipants } = topResults;
      setTop5(top5);
      setTop3Women(top3women);
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
        <h1>top 5</h1>
        <ParticipantsTable participants={top5} />
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
