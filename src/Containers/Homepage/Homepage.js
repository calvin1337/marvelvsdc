import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from "./homepage.module.css";

export class Homepage extends Component {
    render() {
        return (
            <React.Fragment>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.welcomeContainer}>
                        <h1>Marvel</h1>
                    </div>
                </div>
                <div className={styles.right}>
                 <div className={styles.welcomeContainer}>
                        <h1>DC Comics</h1>
                    </div>
                </div>
            </div>
            <div className={styles.Welcomeinfo}>
                <div className={styles.welcomeText}>
                <h1>VS</h1>
                </div>
                <Link to="/play" className={styles.playBtn}>Play</Link>
            </div>
            </React.Fragment>
        )
    }
}

const marvelColor = {
    color: "#ed1d24"
}

const dcColor = {
    color: "#0476f2"
}
export default Homepage
