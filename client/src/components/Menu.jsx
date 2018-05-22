import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from 'react-simple-dropdown';

// const DropdownTrigger = Dropdown.DropdownTrigger
// const DropdownContent = Dropdown.DropdownContent

class Menu extends Component {
  render() {
    const display = this.props.token ? 'block' : 'none';
    const showLogin = this.props.token ? 'none' : 'block';
    const email = this.props.user ? this.props.user.email : null;
    const { openLogin } = this.props;
    return (
      <Dropdown ref={() => 'dropdown'}>
        <DropdownTrigger>
          <i className="material-icons">menu</i>
        </DropdownTrigger>
        <DropdownContent>
          <div style={{ display }} className="segment">
            <strong>{email}</strong>
          </div>
          <ul>
            <li style={{ display: showLogin }} >
              <a onClick={event => openLogin(event)}>Login</a>
            </li>
            <li style={{ display }} >
              <Link to={'/users/profile'}>Profile</Link>
            </li>
            <li style={{ display }} >
              <a href="#">Log out</a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user: state.users.user
  };
};
export default connect(
  mapStateToProps,
  null
)(Menu);
