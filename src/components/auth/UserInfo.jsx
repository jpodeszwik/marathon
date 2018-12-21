import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { logOut } from '../../services/firebase';

function UserInfo(props) {
  const userName = props.user.isAnonymous ? 'anonymous' : props.user.email;

  return (
    <div style={{ float: 'right' }}>
      <span>Logged in as <b>{userName}</b></span>
      <Button color="primary" onClick={logOut}>Log Out</Button>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
