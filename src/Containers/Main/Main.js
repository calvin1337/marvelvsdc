import React, { Component } from 'react'
import styles from "../Homepage/homepage.module.css";
import InfoType from "../../Components/InfoType/InfoType";
import main from "./main.module.css";
import Button from "../../Components/Buttons/Buttons";
import axios from "axios";
import Modal from "../../Components/Modal/Modal";
import FighterInfo from "../../Components/fighterInfo/fighterInfo";
import marvelLogo from "../../Images/marvel.png";

export class Main extends Component {

        state = {

            dc: [

            ],
            
            marvel: [

            ],

            currentDc: {

            },
            currentMarvel: {

            },

            currentMarvelRecord: {
                win:0,
                loss:0,
                draw: 0
            },

            currentDcRecord:{
                win:0,
                loss: 0,
                draw: 0
            },

            showModal: true,
            disableBtn : false
            
        }

        componentDidMount(){
            this.getMarvelCharacter();
            this.getDcCharacter();
        }

        getMarvelCharacter = () => {
            axios.get("https://marvelvsdc-6041d.firebaseio.com/marvel.json")
            .then(res => {
                const character = [];
                for(let key in res.data){
                    character.push({
                        ...res.data[key],
                        id: key,
                        
                    });
                }
                this.setState({marvel: character}, () => {
                    this.randomMarvelCharacter(0);
                });
            })
    
        }

        getDcCharacter = () => {
            axios.get("https://marvelvsdc-6041d.firebaseio.com/dc.json")
            .then(res => {
                const character = [];
                for(let key in res.data){
                    character.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                this.setState({dc: character}, () => {
                    this.randomDcCharacter(0);
                });
            })
        }


        randomDcCharacter = (number) => {
            this.setState({currentDc: this.state.dc[number]})
            this.getDcRecord(number)
        }

        getDcRecord = (number) => {
            this.setState({currentDcRecord: this.state.dc[number].record})
        }

       

        randomMarvelCharacter = (number) => {
            this.setState({currentMarvel: this.state.marvel[number]})
            this.getMarvelRecord(number)
            this.setState({disableBtn: false})
        }

        getMarvelRecord = (number) => {
            this.setState({currentMarvelRecord: this.state.marvel[number].record})

        }

   


        randomFighters = () => {
            let marvelLength = this.state.marvel.length;
            let dcLength = this.state.dc.length;

            let marvelPick = Math.floor(Math.random() * marvelLength);
            let dcPick = Math.floor(Math.random() * dcLength);

            this.randomDcCharacter(dcPick)
            this.randomMarvelCharacter(marvelPick)
        }

        tieGame = () => {
            this.setState({disableBtn: true})

            this.setState({currentMarvelRecord : {
                ...this.state.currentMarvelRecord,
                draw: this.state.currentMarvelRecord.draw + 1
            }}, () => {
                this.updateMarvelState(this.state.currentMarvel.id);
            })
    
           this.setState({currentDcRecord : {
                ...this.state.currentDcRecord,
                draw: this.state.currentDcRecord.draw + 1
            }}, () => {
                this.updateDcState(this.state.currentDc.id);
            })
            
        }

        closeModal = (e) => {
            if(e.target.className === "modal"){
                this.setState({showModal : !this.state.showModal})
                 
             }
            
        }

       

    marvelWin = () => {
        this.setState({disableBtn: true})

        this.setState({currentMarvelRecord : {
            ...this.state.currentMarvelRecord,
            win: this.state.currentMarvelRecord.win + 1
        }}, () => {
            this.updateMarvelState(this.state.currentMarvel.id);
        })

       this.setState({currentDcRecord : {
            ...this.state.currentDcRecord,
            loss: this.state.currentDcRecord.loss + 1
        }}, () => {
            this.updateDcState(this.state.currentDc.id);
        })
        
        
    }

    updateMarvelState = (id) => {
        
        this.state.marvel.map(hero => {
            if(hero.id === id){
             
             hero.record = this.state.currentMarvelRecord
             
         }})

         this.state.marvel.map(hero => {
            if(hero.id === id){
                let data = {
                    ...this.state.currentMarvelRecord
                }
                axios.put(`https://marvelvsdc-6041d.firebaseio.com/marvel/${id}/record.json`, data)
                .then(res => this.randomFighters());
            }
        })        
    }   

   
    
    dcWin = () => {
        this.setState({disableBtn: true})

        this.setState({currentMarvelRecord : {
            ...this.state.currentMarvelRecord,
            loss: this.state.currentMarvelRecord.loss + 1
        }}, () => {
            this.updateMarvelState(this.state.currentMarvel.id);
        })

       this.setState({currentDcRecord : {
            ...this.state.currentDcRecord,
            win: this.state.currentDcRecord.win + 1
        }}, () => {
            this.updateDcState(this.state.currentDc.id);
        })
    }

    updateDcState = (id) => {
        
        this.state.dc.map(hero => {
            if(hero.id === id){
             
             hero.record = this.state.currentDcRecord

         }})

         this.state.dc.map(hero => {
            if(hero.id === id){
                let data = {
                    ...this.state.currentDcRecord
                }
                axios.put(`https://marvelvsdc-6041d.firebaseio.com/dc/${id}/record.json`, data)
                .then(res => console.log(res));
            }
    }  
 )}
    
        

       
    

    render() {
            

        return (
            <React.Fragment>
            <div className={styles.container}>

            <div className={styles.left}>
                <div className={main.fighterName}>
                <p className={main.recordMobile}>

                {`Win ${this.state.currentMarvelRecord.win}  Draw ${this.state.currentMarvelRecord.draw} Loss ${this.state.currentMarvelRecord.loss}`}

</p>    
            <h1>
            <span className={main.recordStyle}>
                {`Win ${this.state.currentMarvelRecord.win}  Draw ${this.state.currentMarvelRecord.draw} Loss ${this.state.currentMarvelRecord.loss}`}
                </span> 
                {this.state.currentMarvel.heroname}</h1>
                 </div>
                 <div className={main.leftGridContainer}>

                    <div className={main.pictureContainer}>

                    <img src={this.state.currentMarvel.img} width="100%" height="420px"></img>

                    <div className={main.winnerBtn}>
                    <Button disabled={this.state.disableBtn} onClick={this.marvelWin} btnType="winBtn">Wins</Button>
                    </div>
                    </div>
                    <div className={main.infoContainer}>
                        <FighterInfo 
                        name={this.state.currentMarvel.name} 
                        firstAppearance={this.state.currentMarvel.firstapp}
                        species={this.state.currentMarvel.species}
                        height={this.state.currentMarvel.height}
                        gender={this.state.currentMarvel.gender}
                        ability={this.state.currentMarvel.ability}
                        powers={this.state.currentMarvel.powers}
                        fighterStyle="marvel"/>
                    <Button disabled={this.state.disableBtn} onClick={this.marvelWin} btnType="winBtnMobile">Wins</Button>

                    </div>
                </div>
                <div className={main.Test}>
                <img id="bnw" className={main.backgroundLogo} src={marvelLogo} width="300" height="120" />
                </div> 
            </div>
            <div className={styles.right}>
                <div className={main.fighterName}>
                    <p className={main.recordMobile}>

                    {`Win ${this.state.currentDcRecord.win} Draw ${this.state.currentDcRecord.draw} Loss ${this.state.currentDcRecord.loss} `}

                    </p>
                    
                <h1><span className={main.recordStyleDc}>
                    {`Win ${this.state.currentDcRecord.win} Draw ${this.state.currentDcRecord.draw} Loss ${this.state.currentDcRecord.loss} `}</span>
                    {this.state.currentDc.heroname}</h1>
                </div>
                <div className={main.rightGridContainer}>
                     
                    <div className={main.pictureContainer}>

                    <img src={this.state.currentDc.img} width="100%" height="420px"></img>

                        <div className={main.winnerBtn}>
                        <Button disabled={this.state.disableBtn} onClick={this.dcWin} btnType="winBtn">Wins</Button>

                        </div>
                    
                    </div>

                    <div className={main.infoContainer}>

                    <FighterInfo 
                     name={this.state.currentDc.name} 
                     firstAppearance={this.state.currentDc.firstapp}
                     species={this.state.currentDc.species}
                     height={this.state.currentDc.height}
                     gender={this.state.currentDc.gender}
                     ability={this.state.currentDc.ability}
                     powers={this.state.currentDc.powers}
                    fighterStyle="dc"/>
                    <div >
                    <Button disabled={this.state.disableBtn} onClick={this.dcWin} btnType="winBtnMobile">Wins</Button>

                    </div>

                    </div>

                </div>
                <div className={main.TestDc}>
                <img className={main.backgroundLogo} id="bnw" src="https://vignette.wikia.nocookie.net/marvel_dc/images/1/12/New_DC_logo.png/revision/latest?cb=20130213193308" width="300" height="120"></img>

                </div> 
            </div>
            

            </div>
            
       
            <Modal onClick={(e) => this.closeModal(e)} className="modal" display={this.state.showModal}/>

        <div className={main.overlayBox}>


        <Button onClick={this.randomFighters} btnType="vsBtn">VS</Button>
            <InfoType />


            <div className={main.tieButton}>
            <Button disabled={this.state.disableBtn} onClick={this.tieGame} btnType="tieBtn">Tie</Button>
            </div>

            <div className={main.bottomVs}>
                <h1>VS</h1>
            </div>

        </div>
        <div className={main.mobileOverlay}>
            <div className={main.vsMobile}>
                <h1>VS</h1>
            </div> 
            <div className={main.tieBtnMobile}>
            <Button disabled={this.state.disableBtn} onClick={this.tieGame} btnType="tieBtnMobile">Tie</Button>

            </div>

        </div>
        </React.Fragment>
        )
    }
}

export default Main
