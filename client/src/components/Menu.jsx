import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from 'react-simple-dropdown';

import { signOut } from '../actions/userActions';
/**
   * @description Renders Menu component to the dom
   * @returns {object} JSX object
   * @param {object} props
   */
const Menu = ({ doSignOut, user }) => {
  let instance;
  return (
    <Dropdown ref={(ref) => { instance = ref; } }>
      <DropdownTrigger>
        <i className="material-icons">menu</i>
      </DropdownTrigger>
      <DropdownContent>
        <div className="segment">
          <strong>{user ? user.email : null}</strong>
        </div>
        <ul>
          <li onClick={() => { instance.hide(); }}>
            <Link to={'/users/profile'}>Profile</Link>
          </li>
          <li onClick={() => { instance.hide(); }}>
            <a onClick={doSignOut}>Log out</a>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  );
};

Menu.propTypes = {
  user: PropTypes.object,
  doSignOut: PropTypes.func
};
const mapStateToProps = (state) => {
  return {
    user: state.users.user
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    doSignOut: () => dispatch(signOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Menu);
