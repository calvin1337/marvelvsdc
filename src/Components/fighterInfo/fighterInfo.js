import React, { Component } from 'react';
import styles from "./fighterInfo.module.css";

export class FighterInfo extends Component {
    getStyle = () => {
        if(this.props.fighterStyle === "marvel"){
            return marvel
        } else return dc
    }
    render() {
       
        return (

            <div className={styles.infoContainer}>
            <div style={this.getStyle()}className={styles.infoBlock}>
               <h1>{this.props.name}</h1>
            </div>
           <div style={this.getStyle()} className={styles.infoBlock}>
               <h1>{this.props.firstAppearance}</h1>
            </div>
            <div style={this.getStyle()} className={styles.infoBlock}>
                 <h1>{this.props.height}</h1>
            </div>
            <div style={this.getStyle()} className={styles.infoBlock}>
               <h1>{this.props.species}</h1>
            </div>
            <div style={this.getStyle()} className={styles.infoBlock}>
                <h1>{this.props.gender}</h1>
            </div>
            <div style={this.getStyle()} className={[styles.infoBlock, styles.power].join(" ")}>
               <p>{this.props.powers}</p>
            </div>
          </div>
        )
    }
}

const marvel = {
    background:"#c81912",
    color: "#fff"
}

const dc = {
    background:"#004E98",    
    color:"#fff"
}

export default FighterInfo
