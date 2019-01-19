import React, { Component } from 'react';
import { getUnprocessedCount } from '../services/fights';

class UnprocessedRecordsCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unprocessedRecords: 0,
    };
    this.updateUnprocessed = this.updateUnprocessed.bind(this);
  }

  componentDidMount() {
    setInterval(this.updateUnprocessed, 1000);
  }

  updateUnprocessed() {
    getUnprocessedCount().then((count) => {
      this.setState({ unprocessedRecords: count });
    });
  }

  render() {
    return (
      <span>Unprocessed records: {this.state.unprocessedRecords }</span>
    );
  }
}

export default UnprocessedRecordsCount;
