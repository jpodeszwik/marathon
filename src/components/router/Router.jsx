import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import DrawPrize from '../prize/DrawPrize';
import RegistrationPage from '../registration/RegistrationPage';
import Results from '../results/Results';
import CheckParticipants from '../checkParticipants/CheckParticipants';
import ManageUsers from '../manageUsers/ManageUsers';
import PropTypes from 'prop-types';

const Router = () => {
  return (
    <BrowserRouter>
      <center>
        <Navbar />
        <Route exact path="/" component={RegistrationPage} />
        <Route path="/prize" component={DrawPrize} />
        <Route path="/results" component={Results} />
        <Route path="/check-participants" component={CheckParticipants} />
        <Route path="/manage-users" component={ManageUsers} />
      </center>
    </BrowserRouter>
  );
};

Router.propTypes = {
  user: PropTypes.object,
};

export default Router;