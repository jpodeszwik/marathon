import React from 'react';
import PropTypes from 'prop-types';

const GrouppedStatistic = props => {
  const { participants, extractor, header } = props;

  const stats = participants.map(extractor).reduce((acc, value) => {
    acc[value] = acc[value] ? acc[value] + 1 : 1;
    return acc;
  }, {});

  return (
    <div className="container">
      <table border="true" className="table">
        <thead>
          <tr>
            <th>{header}</th>
            <th>Ilość</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(entry => {
            const [value, count] = entry;
            return (
              <tr key={value}>
                <td>{value}</td>
                <td>{count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

GrouppedStatistic.propTypes = {
  participants: PropTypes.array,
  extractor: PropTypes.func,
  header: PropTypes.string,
};

export default GrouppedStatistic;
