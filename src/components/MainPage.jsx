import React from 'react';
import Registration from './Registration';
import Overview from './Overview';

function MainPage() {

  return (
    <div>
      <Registration />
      <div style={{ marginTop: '20px' }}><Overview /></div>
    </div>
  );
}

export default MainPage;
