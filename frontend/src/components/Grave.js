import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import './some.css'


export default class Grave extends React.Component {
  render() {
    return (
      <div className="gravecard">
        <div style={{"background":"grey","width":"200px"}}>
        <h2>{this.props.pet.name}</h2>
        <b>Age:</b> {this.props.pet.age}<br />
        {/* <b>Happiness:</b> {this.props.pet.happiness}<br /> */}
        {/* <b>Fullness:</b> {this.props.pet.hunger}<br /> */}
        <b>Type:</b> {this.props.pet.type}<br />
        <b>Stage:</b> {this.props.pet.stage}<br />
        <b></b> Here lies {this.props.pet.name} the {this.props.pet.type}, they will be missed
      </div>
      </div>
    );
  }
}