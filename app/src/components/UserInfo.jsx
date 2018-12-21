import React from 'react';
import { Button, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { logIn, logOut } from '../services/firebase';

function UserInfo(props) {
  return (
    <Row style={{ marginTop: '2px' }}>
      <Container>
        {props.user ?
          <div>
            <span style={{ float: 'left' }}>Logged in as <b>{props.user.email}</b></span>
            <Button style={{ float: 'right' }} color="primary" onClick={logOut}>Log out</Button>
          </div> :
          <Button color="primary" onClick={logIn}>Log in</Button>
        }
      </Container>
    </Row>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
