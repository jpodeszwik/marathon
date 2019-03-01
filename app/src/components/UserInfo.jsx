import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {logIn, logOut} from 'marathon-lib/src/auth';
import './UserInfo.css';

function UserInfo(props) {
    return props.user ? (
        <div className={'user-info-container'}>
            <div className={'vertical-justify'}><span>Zalogowany jako <b>{props.user.email}</b></span></div>
            <Button color="primary" onClick={logOut}>Wyloguj</Button>
        </div>
    ) : (<Button color="primary" onClick={logIn}>Zaloguj</Button>);
}

UserInfo.propTypes = {
    user: PropTypes.object,
};

export default UserInfo;
