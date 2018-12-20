import React from 'react';
import { Button } from 'react-bootstrap';
import { logInAnonymous, logInWithGoogle } from '../services/firebase';

function LogIn() {
  return (
    <div>
      <Button onClick={logInAnonymous}>Continue anonymous</Button>
      <Button color="primary" onClick={logInWithGoogle}>Log in with Google</Button>
    </div>
  );
}

export default LogIn;
