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
