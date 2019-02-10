import React, { useState, useEffect } from 'react';
import { getUnprocessedCount } from '../services/fights';

const UnprocessedRecordsCount = () => {
  const [unprocessedRecords, setUnprocessedRecords] = useState(0);

  const updateUnprocessed = () => {
    getUnprocessedCount().then(setUnprocessedRecords);
  };

  useEffect(() => {
    const interval = setInterval(updateUnprocessed, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span>Niewysłane walki: {unprocessedRecords}</span>;
};

export default React.memo(UnprocessedRecordsCount);
