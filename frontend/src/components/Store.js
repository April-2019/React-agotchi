import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register'

export default class Store extends React.Component {
  componentDidMount() {
    this.props.loggedIn(
        () => {},
        () => this.props.history.push("/")
    );
  }


  handleLogoutClick = () => {
    this.props.logOut(); 
    this.props.history.push("/");
  }



  render() {
    return ( <div>Hello from Store
      <button onClick={this.handleLogoutClick}>Logout</button>
      <button onClick={() => this.props.history.push("/home")}>Home</button>
      <button onClick={() => this.props.history.push("/graveyard")}>Graveyard</button></div> )
  }
}
