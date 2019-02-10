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
    this.interval = setInterval(this.updateUnprocessed, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateUnprocessed() {
    getUnprocessedCount().then(count => {
      this.setState({ unprocessedRecords: count });
    });
  }

  render() {
    return <span>Niewysłane walki: {this.state.unprocessedRecords}</span>;
  }
}

export default UnprocessedRecordsCount;
