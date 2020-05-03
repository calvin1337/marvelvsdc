import React, { Component } from 'react';
import  "./modal.css";

export class Modal extends Component {
    render() {
        let display = true;
        if(this.props.display === true){
            display = {
                display: "block"
            }
        } else if (this.props.display === false){
            display = {
                display: "none"
            }
        }

        return (
            <div className="modal" onClick={this.props.onClick} style={display} >
                <div className="modalBox">
                    <h1>How To Play:</h1>
                    <h3>Press the Vs button to get a random match up</h3>
                    <h3>Selected who you think would win</h3>
                    <h3>If you think it would be a tie click the tie button</h3>
                    <h3>Each match counts towards each characters record </h3>
                </div>
            </div>
        )
    }
}


export default Modal
