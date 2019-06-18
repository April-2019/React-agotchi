import React, { Component } from 'react';
import './Pet.css'


export default class Pet extends Component{
    render(){
    
        const Url = require(`../../images/img/${this.props.pet.type}_stage_${this.props.pet.stage}.gif`)

        return(
            <>
            {
                Object.keys(this.props.style).length > 0
                ?
                (<div style={this.props.style} >
                <img src={Url} className="pet" />
                </div>)
                :
                (<div>
                <div className="name" >
                    My lovely pet
                 <h1 className="h1">{this.props.pet.name}</h1>
                 </div>
                 <div className="pet">
                <img src={Url} className="pet" />
                </div>
                </div>)
            }
            </>
            
        )
    }
}





//const url = require(`../../hog-imgs/${this.state.name.toLowerCase().split(' ').join('_')}.jpg`)