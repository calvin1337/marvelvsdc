import React, { Component } from 'react'
import styles from "./infoType.module.css"


export class InfoType extends Component {
    render() {
        return (
    <div className={styles.taleTape}>
        <div className={styles.taleTapeType}>
            <h1>Real Name</h1>
        </div>
        <div className={styles.taleTapeType}>
            <h1>First Apperance</h1>
        </div>
        <div className={styles.taleTapeType}>
            <h1>Height</h1>
        </div>
        <div className={styles.taleTapeType}>
            <h1>Species</h1>
        </div>
        <div className={styles.taleTapeType}>
            <h1>Gender</h1>
        </div>
        <div className={styles.taleTapeType}>
            <h1>Powers</h1>
        </div>
        
  </div>
        )
    }
}

export default InfoType
