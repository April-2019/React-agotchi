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
      <div className="ui primary top attached button" tabIndex="0">Back Home</div>
      <button className="positive ui button" onClick={() => this.props.buyApple()}>Buy Apple</button>
      <button className="positive ui button" onClick={() => this.props.buyToy()}>Buy Toy</button>
      <button className="positive ui button" onClick={() => this.props.buyHealthItem()}>Buy Health Item</button>
    </React.Fragment>
  )
  }
}
