import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import DrawPrize from '../prize/DrawPrize';
import RegistrationPage from '../registration/RegistrationPage';
import Results from '../results/Results';
import CheckParticipants from '../checkParticipants/CheckParticipants';
import ManageUsers from '../manageUsers/ManageUsers';
import PropTypes from 'prop-types';

const Router = props => {
  return (
    <BrowserRouter>
      <center>
        <Navbar canManageUsers={props.canManageUsers} />
        <Route exact path="/" component={RegistrationPage} />
        <Route path="/prize" component={DrawPrize} />
        <Route path="/results" component={Results} />
        <Route path="/check-participants" component={CheckParticipants} />
        {props.canManageUsers && <Route path="/manage-users" component={ManageUsers} />}
      </center>
    </BrowserRouter>
  );
};

Router.propTypes = {
  canManageUsers: PropTypes.bool,
};

export default Router;