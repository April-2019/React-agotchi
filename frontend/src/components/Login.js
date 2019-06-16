import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register'

class Login extends React.Component {
  componentDidMount() {
    this.props.loggedIn(
        () => this.props.history.push("/home"),
        () => {}
    );
  }

  login = (e) => {
    e.preventDefault();
    let username = document.querySelector("#formLoginUsername").value;
    let password = document.querySelector("#formLoginPassword").value;
    e.target.reset();
    fetch("http://localhost:8000/login",
     {method:"POST", headers:{"Content-Type":"application/json"},
       body:JSON.stringify({"name":username,"password":password})} )
    .then(res => res.json())
    .then( data => {
        if ( data.success === "Approved" ) {
          this.props.history.push("/home");
        }
    });
  }

   render() {
    return (
       <Container>
          <Form onSubmit={this.login}>
            <div className='login_background'>
             <Row className="justify-content-center">
          <Form.Group as={Col} xs='auto' sm='auto' md='auto' lg='auto' controlId='formLoginUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' placeholder='Enter Username' name="userName"/>
            <Form.Text>Please enter your username here</Form.Text>
          </Form.Group>
          </Row>
          <Row className="justify-content-center">
          <Form.Group as={Col} xs='auto' sm='auto' md='auto' lg='auto' xl='auto' controlId='formLoginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password' name="passWord"></Form.Control>
              <Form.Text>Please enter your password here</Form.Text>
              <Button variant="outline-primary" type="submit">Login</Button>
              <Button variant="outline-success" onClick={() => this.props.history.push("/register")}>Register</Button>
            </Form.Group>
            </Row>
          </div>
        </Form>
      </Container>
    )
  }
}

export default Login