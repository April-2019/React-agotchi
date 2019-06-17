import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register'


export default class Store extends React.Component {

  state = {username:""}

  componentDidMount() {
    this.props.loggedIn(
        (username) => {this.setState({username:username})},
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
    .setAttribute('class', 'store_background')
  return (
    <React.Fragment>
      <div>
        Hello from Store
      </div>
      <div>
        {'apple'}
      </div>
      <div>

      </div>
      <div>

      </div>
    </React.Fragment>
  )
  }
}
