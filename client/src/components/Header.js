import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header id="listings-header">
        <div id="listings-search-holder" className="flex">
          <div id="listings-filter-switch" className="flex" >
            <div className="switch">
              <label>
                <a className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Toggle switch to change filter type">
                  <i className="material-icons">info_outline</i>
                </a>
                <input id="listings-switch-input"type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
          </div>
          <div id="listings-input-holder">
            <div style={{ width: '100%', height: '100%' }}>
              <input id="listings-category-input" placeholder="Filter by category" />
              <input id="listings-location-input" placeholder="Filter by location" />
            </div>
          </div>
          <div id="listings-search-btn-holder">
            <button id="listings-search-btn" className="white"><i className="material-icons">search</i></button>
          </div>
        </div>
        <div id="listings-add-holder">
          <a href="addbusiness.html">Add Business</a>
        </div>
      </header>
    );
  }
}

export default Header;
