import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'

class Register extends React.Component {
  componentDidMount() {
    this.props.loggedIn(
        () => this.props.history.push("/home"),
        () => {}
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let username = document.querySelector("#formLoginUsername").value;
    let password = document.querySelector("#formLoginPassword").value;
    let confirmPassword = document.querySelector("#formRegisterReenterPassword").value;
    if(password !== confirmPassword) {
      alert("Passwords must match");
    } else {
      e.target.reset();
      fetch("http://localhost:8000/users",
        {method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"name":username,"password":password})} )
      .then( () =>
        this.props.login(username,password,
          () => this.props.history.push("/home") )
      );
    }
  }

  render() {
  return (
    <Container>
      <Form onSubmit={this.handleSubmit}>
        <div className='register_background'>
          <Row className="justify-content-center">
            <Form.Group
              as={Col}
              xs={8} sm={7} md={6} lg={5} xl={4}
              controlId='formLoginUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter Username' name="userName"/>
              <Form.Text>Please enter your username here</Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group
              as={Col}
              xs={8} sm={7} md={6} lg={5} xl={4}
              controlId='formLoginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password'></Form.Control>
              <Form.Text>Please enter your password here</Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group as={Col} xs={8} sm={7} md={6} lg={5} xl={4} controlId='formRegisterReenterPassword'>
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type='password' placeholder='Re-enter Password'></Form.Control>
              <Form.Text>Please Re-enter your password here</Form.Text>
              <Button variant="outline-primary" type='submit'>Register</Button>
              <Button variant="outline-secondary" onClick={() => this.props.history.push("/")}>Back To Login</Button>
            </Form.Group>
          </Row>
        </div>
      </Form>
    </Container>
  )
  }
}
export default Register