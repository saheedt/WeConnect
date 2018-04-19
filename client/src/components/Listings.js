import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchBusinesses } from '../actions/businessesActions';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: null
    };
  }
  componentWillMount() {
    const { businesses } = this.props;
    if (businesses) {
      return this.genListing(businesses);
    }
    return this.props.fetchBusinesses();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.businesses &&
        nextProps.businesses !== this.props.businesses) {
      return this.genListing(nextProps.businesses);
    }
  }
  genListing(listings) {
    const dom = listings.map((listing, index) => {
      const unique = `${listing.name}-${index}`;
      return (
        <li key={unique} className="collection-item">
          <div className="listings-list-groupings flex" >
            <div className="listings-list-groupings-items-left flex">
              <i className="material-icons circle">business_center</i>
            </div>
            <div className="listings-list-groupings-items-right">
              <h4>
                <Link to={`businesses/${listing.id}`}>
                  <span className="title">{listing.name}</span>
                </Link>
              </h4>
            </div>
          </div>

          <div className="listings-list-groupings flex">
            <div className="listings-list-groupings-items-left flex">
              <i className="material-icons circle">place</i>
            </div>
            <div className="listings-list-groupings-items-right">
              <p>{listing.address}</p>
            </div>
          </div>

          <div className="listings-list-groupings flex">
            <div className="listings-list-groupings-items-left flex">
              <i className="material-icons circle">description</i>
            </div>
            <div className="listings-list-groupings-items-right">
              <p>{listing.category}</p>
            </div>
          </div>
        </li>
      );
    });
    this.setState({ display: dom });
  }
  render() {
    return (
      <section id="listings" className="header-margin">
        <ul id="listings-list" className="collection max630">
          {this.state.display}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.businesses
  };
};
const mapDispatchedToProps = (dispatch) => {
  return {
    fetchBusinesses: () => dispatch(fetchBusinesses())
  };
};
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchedToProps
// ))(Listings);
export default connect(
  mapStateToProps,
  mapDispatchedToProps
)(Listings);
