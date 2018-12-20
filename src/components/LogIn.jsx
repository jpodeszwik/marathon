import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { logInAnonymous, logInWithGoogle } from '../services/firebase';

function LogIn() {
  return (
    <center>
      <Row style={{ margin: '10px 0' }}><Button onClick={logInAnonymous}>Continue anonymous</Button></Row>
      <Row><Button color="primary" onClick={logInWithGoogle}>Log in with Google</Button></Row>
    </center>
  );
}

export default LogIn;
