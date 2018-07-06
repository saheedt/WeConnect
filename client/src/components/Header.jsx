import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './Menu.jsx';

import {
  query,
  queryError,
  removeQueryError
} from '../actions/businessesActions';
import Helper from '../helper/Helper';

class Header extends Component {
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
  componentWillMount() {
    if (window.location.pathname === '/businesses' ||
      window.location.pathname === '/businesses/') {
      this.setState({ display: 'none' });
      return;
    }
    this.setState({ display: 'flex' });
  }
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
  componentWillUnmount() {
    if (this.searchInput) {
      this.searchInput.removeEventListener('keyup', this.handleQuery);
    }
    if (this.selectInput) {
      this.selectInput.removeEventListener('change', this.handleSelect);
    }
  }
  componentWillReceiveProps() {
    if (window.location.pathname === '/businesses' ||
      window.location.pathname === '/businesses/') {
      this.setState({ display: 'none' });
      return;
    }
    this.setState({ display: 'flex' });
  }
  handleSelect(event) {
    if (event.srcElement.value === '--select--') {
      this.queryBy = null;
      return;
    }
    this.queryBy = event.srcElement.value;
  }
  isQueryPage() {
    if (window.location.pathname === '/businesses/filter' ||
        window.location.pathname === '/businesses/filter/') {
      return true;
    }
    return false;
  }
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
  doQuery(queryBy, queryValue) {
    const { queryBusinesses } = this.props;
    queryBusinesses(queryBy, queryValue);
  }
  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
  render() {
    // let show;
    const { display } = this.state;
    const { openLogin } = this.props;
    const { handleQuery } = this;
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
            <div id="listings-input-holder">
              <input id="listings-search-input"
                placeholder="Filter by .." />
            </div>
            <div id="listings-select-holder">
              <select id="search-select">
                <option value="--select--">--select--</option>
                <option value="category">category</option>
                <option value="location">location</option>
              </select>
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
          <div id="route-profile-btn"
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
    queryBusinesses: (by, queryData) => dispatch(query(by, queryData)),
    queryErrored: message => dispatch(queryError(message)),
    clearQueryError: () => dispatch(removeQueryError())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Header);
