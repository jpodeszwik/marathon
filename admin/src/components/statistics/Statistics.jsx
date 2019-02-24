import React, { useEffect, useState } from 'react';
import { subscribeForParticipants } from 'marathon-lib/src/participants';
import GrouppedStatistic from './GrouppedStatistic';

const Statictics = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => subscribeForParticipants(setParticipants), []);

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
