import React from 'react';
import { Button, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { logIn, logOut } from 'marathon-lib/src/auth';

function UserInfo(props) {
  return (
    <Row style={{ marginTop: '2px' }}>
      <Container>
        {props.user ? (
          <div>
            <span style={{ float: 'left' }}>
              Zalogowany jako <b>{props.user.email}</b>
            </span>
            <Button style={{ float: 'right' }} color="primary" onClick={logOut}>
              Wyloguj
            </Button>
          </div>
        ) : (
          <Button color="primary" onClick={logIn}>
            Zaloguj
          </Button>
        )}
      </Container>
    </Row>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
