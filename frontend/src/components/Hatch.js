import React, { Component } from 'react'

import constants from '../constants'

export default class Hatch extends Component{
    

    constructor() {
        super();
        this.state = {username: ""}
    }

    componentDidMount() {
        this.props.loggedIn(
            (username) => {this.setState({username:username})},
            () => this.props.history.push("/")
        );
    }

    pikachu = (name) => {
        return {name: name,
                age: 0,
                health: 5,
                happiness: 5,
                type: "pikachu",
                hunger: 5,
                stage: 1, // picchu
                epitaph: ""
        }
    }

    sylveon = (name) => {
        return {name: name,
            age: 0,
            health: 5,
            happiness: 5,
            type: "sylveon",
            hunger: 5,
            stage: 1, // eevee
            epitaph: ""
        }
    }

    scyther = (name) => {
        return {name: name,
            age: 0,
            health: 5,
            happiness: 5,
            type: "scyther",
            hunger: 5,
            stage: 1, // scyther
            epitaph: ""
        }
    }

    charmander = (name) => {
        return {name: name,
            age: 0,
            health: 5,
            happiness: 5,
            type: "charmander",
            hunger: 5,
            stage: 1, // charmander
            epitaph: ""
        }
    }

    poplio = (name) => {
        return {name: name,
            age: 0,
            health: 5,
            happiness: 5,
            type: "popplio",
            hunger: 5,
            stage: 1, // popplio
            epitaph: ""
        }
    }

    ob = {
        pikachu: this.pikachu,
        charmander: this.charmander,
        sylveon: this.sylveon,
        syther: this.syther,
        poplio: this.poplio
    }



    handleSubmit = (e) => {
        e.preventDefault();
        let pet = this.ob[e.target.children[1].value](e.target.children[0].value);
        e.target.reset();
        e.target.style = "display: none";
        fetch(`${constants.apiUrl}/pets`,
          {method:"POST",
           headers: {"Content-Type":"application/json",
           "Authorization":`Bearer ${localStorage.getItem("token")}`},
           body: JSON.stringify({name: this.state.username, data: pet}) })
        .then(
           () => this.displayAnimation()
        );
    }

    displayAnimation = () => {
        setTimeout(
            () => { setInterval(
                () => { 
                    console.log("that");
                    document.querySelector("#rightEgg").style.display = "none";
                    document.querySelector("#leftEgg").style.display = "";
                 }
                ,1000) },500);
        setInterval(
            () => { 
                console.log("this");
                document.querySelector("#rightEgg").style.display = "";
                document.querySelector("#leftEgg").style.display = "none";
             }
        ,1000);
    }

    render(){
        return(
            <div>
                This is to make a Pet
                <form onSubmit={this.handleSubmit} >
                    <input type="text"></input>
                    <select>
                        <option value="pikachu">Pikachu</option>
                        <option value="sylveon">Sylveon</option>
                        <option value="charmander">Charmander</option>
                        <option value="scyther">Scyther</option>
                        <option value="poplio">Poplio</option>
                    </select>
                    <input type="submit"  ></input>
                </form>
                <div id="leftEgg" style={{"display":"none","width":"500px","height":"500px","position":"absolute","left":"100px","top":"100px"}}>
                    <img src="egg.png" width="500" height="500" />
                </div>
                <div id="rightEgg" style={{"display":"none","width":"500px","height":"500px","position":"absolute","left":"300px","top":"100px"}}>
                    <img src="egg.png" width="500" height="500" />
                </div>
            </div>
        )
    }
}
