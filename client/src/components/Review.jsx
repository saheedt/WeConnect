import React, { Component } from 'react';

export default class Review extends Component {
  render() {
    return (
      <div className="profile-review flex padding-20">
        <div className="review-date-time">
          <span className="right">{this.props.createdAt.split('T')[0]}</span>
        </div>
        <div className="reviewer">
          <ul className="collection">
            <li className="collection-item avatar">
              <i className="material-icons circle">contacts</i>
              <h5>{this.props.name}</h5>
            </li>
          </ul>
        </div>
        <div className="review padding-left-20">
          {this.props.review}
        </div>
      </div>
    );
  }
}
