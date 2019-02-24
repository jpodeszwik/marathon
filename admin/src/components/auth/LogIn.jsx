import React from 'react';
import { Button, Row } from 'reactstrap';
import { logIn } from 'marathon-lib/src/auth';

function LogIn() {
  return (
    <center>
      <Row><Button color="primary" onClick={logIn}>Log in with Google</Button></Row>
    </center>
  );
}

export default LogIn;
