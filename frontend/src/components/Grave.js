import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'

export default class Grave extends React.Component {
  render() {
    return (
      <div style={{"background":"white","width":"200px"}}>
        <h2>{this.props.pet.name}</h2>
        <b>Age:</b> {this.props.pet.age}<br />
        <b>Happiness:</b> {this.props.pet.happiness}<br />
        <b>Fullness:</b> {this.props.pet.hunger}<br />
        <b>Type:</b> {this.props.pet.type}<br />
        <b>Stage:</b> {this.props.pet.stage}<br />
        <b>Epitaph:</b> {this.props.pet.epitaph}
      </div>
    );
  }
}