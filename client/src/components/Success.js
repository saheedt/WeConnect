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
	        marginBottom: '0.5rem',
	        backgroundColor: (this.props.background ? this.props.background : 'teal'),
	        borderColor: (this.props.background ? null : 'rgb(226, 168, 167)'),
        };
        const successStyles = {
            fontSize: '1rem',
            fontWeight: 'bold', 
            color: (this.props.color ? this.props.color : '#FFF' ),
            textAlign: 'center'
        };

        return (
            <div id="success-container" style={containerStyles}>
                <div style={successStyles}>{this.props.message}</div>
            </div>
        )
    }
}