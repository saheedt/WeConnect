import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './Menu.jsx';

import { query } from '../actions/businessesActions';
import Helper from '../helper/Helper';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
    this.listingsSwitchInput = null;
    this.categoryInput = null;
    this.locationInput = null;
    this.toggleHandler = this.toggleHandler.bind(this);
    this.doFilter = this.doFilter.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  componentWillMount() {
    if (window.location.pathname === '/businesses' ||
      window.location.pathname === '/businesses/') {
      this.setState({ display: 'none' });
      return;
    }
    this.setState({ display: 'block' });
  }
  componentDidMount() {
    this.listingsSwitchInput = document.getElementById('listings-switch-input');
    this.categoryInput = document.getElementById('listings-category-input');
    this.locationInput = document.getElementById('listings-location-input');
    if (this.listingsSwitchInput) {
      this.listingsSwitchInput.addEventListener('change', this.toggleHandler);
    }
    if (this.categoryInput) {
      this.categoryInput.addEventListener('keyup', this.doFilter);
    }
    if (this.locationInput) {
      this.locationInput.addEventListener('keyup', this.doFilter);
    }
  }
  componentWillUnmount() {
    if (this.listingsSwitchInput) {
      this.listingsSwitchInput
        .removeEventListener('change', this.toggleHandler);
    }
    if (this.categoryInput) {
      this.categoryInput
        .removeEventListener('keyup', this.doCategoryFilter);
    }
    if (this.locationInput) {
      this.locationInput
        .removeEventListener('keyup', this.doLocationFilter);
    }
  }
  componentWillReceiveProps() {
    if (window.location.pathname === '/businesses' ||
      window.location.pathname === '/businesses/') {
      this.setState({ display: 'none' });
      return;
    }
    this.setState({ display: 'block' });
  }
  toggleHandler(event) {
    const listingsLocationInput =
      document.querySelector('#listings-location-input');
    const listingsCategoryInput =
      document.querySelector('#listings-category-input');
    this
      .toggleSearchType(event, listingsLocationInput, listingsCategoryInput);
  }
  toggleSearchType(event, location, category) {
    if (event.target.checked) {
      if (location.style.display === 'none' ||
      location.style.display === '') {
        location.style.display = 'block';
        category.style.display = 'none';
      }
      return;
    }
    if (!event.target.checked) {
      if (category.style.display === 'none' ||
      category.style.display === '') {
        category.style.display = 'block';
        location.style.display = 'none';
      }
    }
  }
  doFilter(event) {
    if ((event.keyCode === 13 || event.key === 'Enter')) {
      if (!Helper.isEmptyOrNull(event.srcElement.value)) {
        const { queryBusinesses } = this.props;
        if (event.srcElement.id === 'listings-category-input') {
          queryBusinesses('category', event.srcElement.value);
          return this.props.history.push('/businesses/filter');
        }
        if (event.srcElement.id === 'listings-location-input') {
          queryBusinesses('location', event.srcElement.value);
          return this.props.history.push('/businesses/filter');
        }
      }
      // TODO: show input empty validation error
    }
  }
  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
  render() {
    // let show;
    const { display } = this.state;
    const { openLogin } = this.props;
    return (
      <header id="listings-header" className="flex">
        <div id="listings-header-holder-left-first" style={{}}>
          <div style={{ display }} className="wc-header-back-btn-holder flex">
            <a onClick={this.goBack} href="#">
              <i className="material-icons">arrow_back</i>
            </a>
          </div>
        </div>
        <div id="listenings-header-holder-right">
          <div id="listings-search-holder-gen" className="flex">
            <div id="listings-filter-switch" className="flex" >
              <div className="switch">
                <label>
                  <a className="tooltipped" data-position="bottom"
                    data-delay="50"
                    data-tooltip="Toggle switch to change filter type">
                    <i className="material-icons">info_outline</i>
                  </a>
                  <input id="listings-switch-input"type="checkbox" />
                  <span className="lever"></span>
                </label>
              </div>
            </div>
            <div id="listings-input-holder">
              <div style={{ width: '100%', height: '100%' }}>
                <input id="listings-category-input"
                  placeholder="Filter by category" />
                <input id="listings-location-input"
                  placeholder="Filter by location" />
              </div>
            </div>
            <div id="listings-search-btn-holder">
              <button id="listings-search-btn" className="white">
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
        </div>
        <div id="listings-add-holder">
          <div style={{}} id="route-profile-btn"
            className="flex pointer-cursor">
            <Menu openLogin={openLogin}/>
          </div>
        </div>
      </header>
    );
  }
}

// display: show

const mapStateToProps = (state) => {
  return {
    ...state.users
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    queryBusinesses: (by, queryData) => dispatch(query(by, queryData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Header);
