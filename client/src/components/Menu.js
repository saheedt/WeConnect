import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

// const DropdownTrigger = Dropdown.DropdownTrigger
// const DropdownContent = Dropdown.DropdownContent

class Menu extends Component {
  render() {
    const { details } = this.props;
    return (
      <Dropdown ref={'dropdown'}>
        <DropdownTrigger>
          <i className="material-icons">menu</i>
        </DropdownTrigger>
        <DropdownContent>
          <div className="segment"><strong>{details}</strong></div>
          <ul>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Log out</a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
}

export default Menu;
