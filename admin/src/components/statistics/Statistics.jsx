import React, { useEffect, useState } from 'react';
import { subscribeForParticipants, unsubscribeForParticipants } from '../../services/participantRepository';
import GrouppedStatistic from './GrouppedStatistic';

const Statictics = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const listener = subscribeForParticipants(setParticipants);
    return () => unsubscribeForParticipants(listener);
  }, []);

  return (
    <div>
      <GrouppedStatistic participants={participants} extractor={p => p.bjjGrade} header={'Pas'} />
      <GrouppedStatistic participants={participants} extractor={p => p.sex} header={'Płeć'} />
      <GrouppedStatistic participants={participants} extractor={p => p.adult} header={'Pełnoletni'} />
      <GrouppedStatistic participants={participants} extractor={p => p.homeClub} header={'Klub'} />
      <GrouppedStatistic participants={participants} extractor={p => p.city} header={'Miasto'} />
    </div>
  );
};

export default Statictics;
