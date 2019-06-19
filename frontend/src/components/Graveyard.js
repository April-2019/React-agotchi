import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register'
import Grave from './Grave'
import constants from '../constants'

export default class Graveyard extends React.Component {

  state = { username:"", deadPets: [] }

  fetchDeadPets = () => {
    fetch(`${constants.apiUrl}/users/${this.state.username}/pets`,{method:"GET",
        headers:{"Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`}})
        .then(res=>res.json())
        .then(
            pets => {
              this.setState({
                deadPets: pets.filter( pet => (pet.health === 0) )
              })
            }
        )
  }


  componentDidMount() {
    this.props.loggedIn(
        (username) => {
          this.setState({username:username}, this.fetchDeadPets)
        },
        () => this.props.history.push("/")
    );
  }

  handleLogoutClick = () => {
    this.props.logOut(); 
    this.props.history.push("/");
  }

  render() {
    return ( <div>
      <button onClick={this.handleLogoutClick}>Logout</button>
      <button onClick={() => this.props.history.push("/home")}>Home</button>
      <button onClick={() => this.props.history.push("/store")}>Store</button>
      
      {
        this.state.deadPets.map(
          pet => <Grave pet={pet} />
        )
      }
      
      </div> )
  }
}
