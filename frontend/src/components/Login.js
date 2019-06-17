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
    this.props.login(username,password,
      () => this.props.history.push("/home") );
  }


   render() {
    document.body.setAttribute('class', 'homepage_background')
    return (
       <Container>
          <Form onSubmit={this.login}>
            <div className='login_background'>
             <Row className="justify-content-center">
          <Form.Group as={Col} xs={8} sm={7} md={6} lg={5} xl={4} controlId='formLoginUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' placeholder='Enter Username' name="userName"/>
            <Form.Text>Please enter your username here</Form.Text>
          </Form.Group>
          </Row>
          <Row className="justify-content-center">
          <Form.Group as={Col} xs={8} sm={7} md={6} lg={5} xl={4} controlId='formLoginPassword'>
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