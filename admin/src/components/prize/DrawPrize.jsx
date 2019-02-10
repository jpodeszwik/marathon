import React, { useState } from 'react';
import { listFighters } from '../../services/users';
import { getParticipant } from '../../services/participantRepository';
import { Button, Container, Row } from 'reactstrap';
import RoundPicker from './RoundPicker';

const DrawPrize = () => {
  const [round, setRound] = useState(new Date());
  const [participantsCount, setParticipantsCount] = useState(0);
  const [winner, setWinner] = useState(null);

  const roundSelected = date => {
    listFighters(date).then(fighters => {
      setParticipantsCount(fighters.length);
      setRound(date);
      setWinner(null);
    });
  };

  const doDrawPrize = () => {
    listFighters(round)
      .then(participants => participants[Math.floor(Math.random() * participants.length)])
      .then(winnerId => {
        const participant = getParticipant(winnerId);
        setWinner(`${winnerId} ${participant.fullName}`);
      });
  };

  return (
    <Container>
      <center>
        <RoundPicker onRoundSelected={roundSelected} />
        <Row>
          <span>Liczba zawodników: {participantsCount}</span>
        </Row>
        <Row>
          <Button onClick={doDrawPrize}>Losuj</Button>
        </Row>
        <Row>
          <span>Zwycięzca: {winner}</span>
        </Row>
      </center>
    </Container>
  );
};

export default DrawPrize;
