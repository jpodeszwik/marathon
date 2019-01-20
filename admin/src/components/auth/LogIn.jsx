import React from 'react';
import { Button, Row } from 'reactstrap';
import { logInWithGoogle } from '../../services/firebase';

function LogIn() {
  return (
    <center>
      <Row><Button color="primary" onClick={logInWithGoogle}>Log in with Google</Button></Row>
    </center>
  );
}

export default LogIn;
