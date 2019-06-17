import React from 'react'
import constants from '../constants'
// import {Form, Container, Col, Button, Row} from 'react-bootstrap'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Register from './Register'


export default class Store extends React.Component {

  state = {
    username:""
  }

  componentDidMount() {
    this.props.loggedIn(
        (username) => {this.setState({username:username})},
        () => this.props.history.push("/")
    );
  }

  buyFood = () => {
    fetch(`${constants.apiUrl}/foods`, {
      method: 'POST',
      headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
      body: JSON.stringify(
        {
          name: this.state.username,
          data:{
            name: 'Good Food',
            price: 40,
            filling: 7,
            healthy: true
          }
        })
    })
    .then(
      alert('You bought an apple')
      )
  }

  buyToy = () => {
    fetch(`${constants.apiUrl}/toys`, {
      method: 'POST',
      headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
      body: JSON.stringify(
        {
          name: this.state.username,
          data:{
            name: 'Teddy Bear',
            price: 20,
            fun: 5
          }
        })
    })
    .then(
      alert('You bought a teddy bear')
      )
  }

  buyMedicine = () => {
    fetch(`${constants.apiUrl}/healths`, {
      method: 'POST',
      headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
      body: JSON.stringify(
        {
          name: this.state.username,
          data:{
            name: 'Medicine',
            price: 15,
            incval: 3
          }
        })
    })
    .then(
      alert('You bought a medicine')
    )
  }




  backHome = () => {
    this.setState({
      username:""
    })
    this.props.history.push('/home')
  }

  render() {
    
    document.body.setAttribute('class', 'store_background')
    return (
    <React.Fragment>
      <div className="ui primary top attached button" tabIndex="0" onClick={() => this.backHome()}>Back Home</div>
      <button className="positive ui button" onClick={() => this.buyFood()}>Buy Food</button>
      <button className="positive ui button" onClick={() => this.buyToy()}>Buy Toy</button>
      <button className="positive ui button" onClick={() => this.buyMedicine()}>Buy Medicine</button>
    </React.Fragment>
    )
  }
}
