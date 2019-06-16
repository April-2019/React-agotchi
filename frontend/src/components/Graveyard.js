import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register'

export default class Graveyard extends React.Component {
  componentDidMount() {
    this.props.loggedIn(
        () => {},
        () => this.props.history.push("/")
    );
  }
  render() {
    return ( <div></div> )
  }
}
