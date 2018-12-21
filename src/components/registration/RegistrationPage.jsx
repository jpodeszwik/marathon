import React from 'react';
import RegistrationForm from './RegistrationForm';
import Overview from './RegisteredUsers';

export default function RegistrationPage() {

  return (
    <div>
      <RegistrationForm />
      <div style={{ marginTop: '20px' }}><Overview /></div>
    </div>
  );
}
