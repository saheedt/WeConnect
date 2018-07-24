import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Menu from './Menu.jsx';

import {
  query,
  queryError,
  removeQueryError
} from '../actions/businessesActions';
import Helper from '../helper/Helper';

/**
 * @description Displays header
 * @class Header
 * @extends {Component}
 * @export
 */
class Header extends Component {
  /**
   * @description Creates an instance of Header
   * @param {Object} props
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
    this.searchInput = null;
    this.selectInput = null;
    this.queryBy = null;
    this.doQuery = this.doQuery.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.goBack = this.goBack.bind(this);
    this.errorMsg = null;
  }
  /**
   * @description Fires before component is mounted into the dom
   * @memberof Header
   */
  componentWillMount() {
    const { clearQueryError } = this.props;
    if (window.location.pathname === '/businesses' ||
      window.location.pathname === '/businesses/') {
      this.setState({ display: 'none' });
      return;
    }
    this.setState({ display: 'flex' });
    clearQueryError();
  }
  /**
   * @description Fires when component is added to the dom
   * @memberof Header
   */
  componentDidMount() {
    this.searchInput = document.getElementById('listings-search-input');
    this.selectInput = document.getElementById('search-select');
    if (this.searchInput) {
      this.searchInput.addEventListener('keyup', this.handleQuery);
    }
    if (this.selectInput) {
      this.selectInput.addEventListener('change', this.handleSelect);
    }
  }
  /**
   * @description Fires when component is removed from the dom
   * @memberof Header
   */
  componentWillUnmount() {
    const { searchInput, selectInput } = this;
    if (searchInput) {
      searchInput.removeEventListener('keyup', this.handleQuery);
    }
    if (selectInput) {
      selectInput.removeEventListener('change', this.handleSelect);
    }
  }
  /**
   * @description Fires when component props changes
   * @memberof Header
   */
  componentWillReceiveProps() {
    if (window.location.pathname === '/businesses' ||
      window.location.pathname === '/businesses/') {
      this.setState({ display: 'none' });
      return;
    }
    this.setState({ display: 'flex' });
  }
  /**
   * @description Handles search type select element change event
   * @param {Object} event
   * @memberof Header
   */
  handleSelect(event) {
    if (event.srcElement.value === '--select--') {
      this.queryBy = null;
      return;
    }
    this.queryBy = event.srcElement.value;
  }
  /**
   * @description Checks if Query page is the currently displayed page
   * @return {Boolean} true / false
   * @memberof Header
   */
  isQueryPage() {
    if (window.location.pathname === '/businesses/filter' ||
        window.location.pathname === '/businesses/filter/') {
      return true;
    }
    return false;
  }
  /**
   * @description Handles search event
   * @param {Object} event
   * @return {Function} queryErrored
   * @memberof Header
   */
  handleQuery(event) {
    const {
      isQueryPage,
      queryBy,
      doQuery,
      searchInput
    } = this;
    const {
      queryErrored,
      history,
      clearQueryError
    } = this.props;
    clearQueryError();
    if ((event.keyCode === 13 || event.type === 'click')) {
      if (!isQueryPage()) {
        history.push('/businesses/filter');
      }
      if (queryBy === '--select--' || queryBy === null) {
        return queryErrored('please select query type');
      }
      if (Helper.isEmptyOrNull(searchInput.value)) {
        return queryErrored('oops!.. query cannot be empty');
      }
      doQuery(queryBy, searchInput.value);
    }
  }
  /**
   * @description Handles asyncronous server business query
   * @param {String} queryBy
   * @param {String} queryValue
   * @memberof Header
   */
  doQuery(queryBy, queryValue) {
    const { queryBusinesses } = this.props;
    queryBusinesses(queryBy, queryValue);
  }
  /**
   * @description Handles back button onclick event
   * @param {Object} event
   * @memberof Header
   */
  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
  /**
   * @description Renders component to the dom
   * @returns {object} JSX object
   * @memberof Header
   */
  render() {
    const { display } = this.state;
    const { openLogin, token } = this.props;
    const { handleQuery } = this;
    const displayMenu = token ? 'flex' : 'none';
    const displayLogin = token ? 'none' : 'flex';
    return (
      <header id="listings-header" className="flex">
        <div id="listings-header-holder-left-first">
          <div style={{ display }} className="wc-header-back-btn-holder flex">
            <a onClick={this.goBack} href="#">
              <i className="material-icons">arrow_back</i>
            </a>
          </div>
        </div>
        <div id="listenings-header-holder-right">
          <div id="listings-search-holder-gen" className="flex">
            <div id="listings-select-holder">
              <select id="search-select">
                <option value="--select--">--select--</option>
                <option value="category">category</option>
                <option value="location">location</option>
              </select>
            </div>
            <div id="listings-input-holder">
              <input id="listings-search-input"
                placeholder="Search for businesses.." />
            </div>
            <div id="listings-search-btn-holder">
              <button id="listings-search-btn" className="white"
                onClick={handleQuery}>
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
        </div>
        <div id="listings-add-holder">
          <button id="route-login-btn" className="flex pointer-cursor"
            style={{ display: displayLogin }}
            onClick={openLogin}>
              Login
            {/* <i className="material-icons">search</i> */}
          </button>
          <div id="route-profile-btn"
            className="flex pointer-cursor"
            style={{ display: displayMenu }}>
            <Menu openLogin={openLogin}/>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  queryBusinesses: PropTypes.func,
  clearQueryError: PropTypes.func,
  queryErrored: PropTypes.func,
  openLogin: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  token: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    token: state.users.token
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    queryBusinesses: (by, queryData) => dispatch(query(by, queryData)),
    queryErrored: message => dispatch(queryError(message)),
    clearQueryError: () => dispatch(removeQueryError()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Header);
