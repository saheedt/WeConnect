import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

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
    this.toggleHandler = (e) => {
      const listingsLocationInput =
        document.querySelector('#listings-location-input');
      const listingsCategoryInput =
        document.querySelector('#listings-category-input');
      this.toggleSearchType(e, listingsLocationInput, listingsCategoryInput);
    };
  }
  toggleSearchType(e, location, category) {
    if (e.target.checked) {
      if (location.style.display === 'none' ||
      location.style.display === '') {
        location.style.display = 'block';
        category.style.display = 'none';
      }
      return;
    }
    if (!e.target.checked) {
      if (category.style.display === 'none' ||
      category.style.display === '') {
        category.style.display = 'block';
        location.style.display = 'none';
      }
    }
  }
  doFilter(e) {
    if ((e.keyCode === 13 || e.key === "Enter")) {
      if (!Helper.isEmptyOrNull(e.srcElement.value)) {
        const { queryBusinesses } = this.props;
        if (e.srcElement.id === 'listings-category-input') {
          queryBusinesses('category', e.srcElement.value)
          return this.props.history.push('/businesses/filter')
        }
        if (e.srcElement.id === 'listings-location-input') {
          queryBusinesses('location', e.srcElement.value)
          console.log('listings-location-input querys made.. should redirect')
          return this.props.history.push('/businesses/filter')
        }
      }
      // TODO: show input empty validation error
      return;
    }
  }
  componentWillMount() {
    if (window.location.pathname !== '/businesses') {
      this.setState({ display: 'block' });
      return;
    }
    this.setState({ display: 'none' });
  }
  componentDidMount() {
    this.listingsSwitchInput = document.getElementById('listings-switch-input');
    this.categoryInput = document.getElementById('listings-category-input');
    this.locationInput = document.getElementById('listings-location-input');
    if (this.listingsSwitchInput) {
      this.listingsSwitchInput.addEventListener('change', this.toggleHandler);
    }
    if (this.categoryInput) {
      this.categoryInput.addEventListener('keyup', this.doFilter.bind(this));
    }
    if (this.locationInput) {
      this.locationInput.addEventListener('keyup', this.doFilter.bind(this));
    }
  }
  componentWillUnmount() {
    if (this.listingsSwitchInput) {
      this.listingsSwitchInput
        .removeEventListener('change', this.toggleHandler);
    }
    if (this.categoryInput) {
      this.categoryInput
        .removeEventListener('keyup', this.doCategoryFilter)
    }
    if (this.locationInput) {
      this.locationInput
        .removeEventListener('keyup', this.doLocationFilter)
    }
  }
  componentWillReceiveProps() {
    if (window.location.pathname !== '/businesses') {
      this.setState({ display: 'block' });
      return;
    }
    this.setState({ display: 'none' });
  }
  goBack(e) {
    e.preventDefault();
    window.history.back();
  }
  render() {
    const { display } = this.state;
    return (
      <header id="listings-header" className="flex">
        <div id="listings-header-holder-left-first" style={{}}>
          <div style={{ display }} className="wc-header-back-btn-holder flex">
            <a onClick={this.goBack.bind(this)} href="#">
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
          <a id="route-profile-btn" className="flex"
            href="updatebusinessprofile.html">Update profile</a>
        </div>
      </header>
    );
  }
}

// export default Header;
// const mapStateToProps = (state) => {
//   return {
//     ...state.businesses.queries
//   };
// };
const mapDispatchedToProps = (dispatch) => {
    return {
        queryBusinesses: (by, queryData) => dispatch(query(by, queryData))
    };
};
export default connect(
  null,
  mapDispatchedToProps
)(Header);

