import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { subscribeForTop, unsubscribeForTop } from '../../services/users';
import FightersTable from './FightersTable';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top5: [],
      top3women: [],
    };
  }

  componentDidMount() {
    this.topListener = subscribeForTop(topResults => {
      const { top5, top3women } = topResults;
      this.setState({ top5, top3women });
    });
  }

  componentWillUnmount() {
    unsubscribeForTop(this.topListener);
  }

  render() {
    return <Container>
      <center>
        <h1>top 5</h1>
        <FightersTable fighters={this.state.top5} />
        <h1>top 3 kobiet</h1>
        <FightersTable fighters={this.state.top3women} />
      </center>
    </Container>;
  }
}

export default Results;