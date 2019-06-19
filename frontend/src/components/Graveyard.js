import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register'
import Grave from './Grave'
import constants from '../constants'
import './some.css'

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

    document
    .body
    .setAttribute('class', 'grave')
    return ( 
    this.state.deadPets?<div>
    <div>
    <div
          className="ui grey vertical animated large button"
          tabIndex="0" onClick={this.handleLogoutClick}>
          <div className="hidden content">Logout</div>
          <div className="visible content">
            <i className="log out icon"></i>
          </div>
        </div>
        
        <div
          className="ui grey vertical animated large button"
          tabIndex="0" onClick={() => this.props.history.push("/home")}>
          <div className="hidden content">Home</div>
          <div className="visible content">
            <i className="home icon"></i>
          </div>
        </div>

        <div
          className="ui grey vertical animated large button"
          tabIndex="0" onClick={() => this.props.history.push("/store")}>
          <div className="hidden content">Store</div>
          <div className="visible content">
            <i className="shopping cart icon"></i>
          </div>
        </div>
      </div>
      <div className="lawn">
      {
        this.state.deadPets.map(
          pet => <Grave pet={pet} />
        )
      }
      
      </div> 
      </div>:null)
  }
}
