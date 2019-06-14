import React from 'react'
import {Form, Container, Col, Button} from 'react-bootstrap'

const Login = () => {
  return (
    <Container>
      <Form>
        <Form.Group controlId='formLoginUsername'>
          <Form.label>Username</Form.label>
          <Form.Control type='text' placeholder='Enter Username'></Form.Control>
          <Form.text>Please enter your username here</Form.text>
        </Form.Group>
        <Form.Group controlId='formLoginPassword'>
          <Form.label>Password</Form.label>
          <Form.Control type='password' placeholder='Enter Password'></Form.Control>
          <Form.text>Please enter your password here</Form.text>
        </Form.Group>
        <Button variant="primary">Login</Button>
      </Form>
    </Container>
  )
}
export default Login