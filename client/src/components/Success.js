import React, { Component } from 'react';

export default class Success extends Component {
  render() {
    if (this.props.message === null ||
      this.props.message === undefined) {
      return null;
    }
    const containerStyles = {
      width: '40%',
      padding: '10px',
      marginTop: '0.5rem',
      backgroundColor: (this.props.background ? this.props.background : 'teal'),
      borderColor: (this.props.border ? this.props.border : null),
    };
    const successStyles = {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: (this.props.color ? this.props.color : '#FFF'),
      textAlign: 'center'
    };
    return (
      <div id="success-container" style={containerStyles}>
        <div style={successStyles}>{this.props.message}</div>
      </div>
    );
  }
}
