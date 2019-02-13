import React, { useEffect, useState } from 'react';
import { subscribeForParticipants, unsubscribeForParticipants } from '../../services/participantRepository';

const Statictics = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const listener = subscribeForParticipants(setParticipants);
    return () => unsubscribeForParticipants(listener);
  }, []);

  const belts = participants
    .map(p => p.bjjGrade)
    .reduce((acc, grade) => {
      acc[grade] = acc[grade] ? acc[grade] + 1 : 1;
      return acc;
    }, {});

  return (
    <div className="container">
      <table border="true" className="table">
        <thead>
          <tr>
            <th>Pas</th>
            <th>Ilość</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(belts).map(entry => {
            const [belt, count] = entry;
            return (
              <tr key={belt}>
                <td>{belt}</td>
                <td>{count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Statictics;
