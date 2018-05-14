import React, { Component } from 'react';

export default class Error extends Component {
  render() {
    if (this.props.error === null ||
        this.props.error === undefined) {
      return null;
    }
    const containerStyles = {
      width: '40%',
      padding: '10px',
      marginBottom: '0.5rem',
      backgroundColor: (this.props.background ?
        this.props.background : 'rgb(254, 241, 241)'),
      borderColor: (this.props.background ? null : 'rgb(226, 168, 167)'),
    };
    const errorStyles = {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: (this.props.color ? this.props.color : 'rgb(213, 109, 109)'),
      textAlign: 'center'
    };
    return (
      <div id="error-container" style={containerStyles}>
        <div style={errorStyles}>{this.props.error}</div>
      </div>
    );
  }
}
