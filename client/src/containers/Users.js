import React, { Component } from 'react';

import Login from '../components/Login';

class Users extends Component {
    static showLogin = (JwModal) => {
        return(
            <JwModal id="user-login">
                <Login />
            </JwModal>
        );
    }
    static showSignUp = () => {
        return(
            <JwModal id="user-sign-up">
            </JwModal>
        );
    }
}
export default Users;