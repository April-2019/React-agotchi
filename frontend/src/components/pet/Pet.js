import React, { Component } from 'react';
import './Pet.css'


export default class Pet extends Component{
    render(){
    
        const Url = require(`../../images/img/${this.props.pet.type}_stage_${this.props.pet.stage}.gif`)

        return(
            <div className="name">
                <h1>{this.props.pet.name}</h1>
                <img src={Url} className="pet" />
            </div>
        )
    }
}





//const url = require(`../../hog-imgs/${this.state.name.toLowerCase().split(' ').join('_')}.jpg`)