import React, { Component } from 'react';
import "./buttons.css";

export class Button extends Component {

    render() {
            
        return (
            <button disabled={this.props.disabled} onClick={this.props.onClick} className={this.props.btnType}>{this.props.children}</button>
        )
    }
}

export default Button
