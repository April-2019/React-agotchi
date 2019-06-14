import React from 'react'
import {Form, Container, Col, Button} from 'react-bootstrap'

const Register = () => {
  return (
    <Container>
      <Form>
        <Form.Group controlId='formRegisterUsername'>
          <Form.label>Username</Form.label>
          <Form.Control type='text' placeholder='Enter Username'></Form.Control>
          <Form.text>Please enter your username here</Form.text>
        </Form.Group>
        <Form.Group controlId='formRegisterPassword'>
          <Form.label>Password</Form.label>
          <Form.Control type='password' placeholder='Enter Password'></Form.Control>
          <Form.text>Please enter your password here</Form.text>
        </Form.Group>
        <Form.Group controlId='formRegisterReenterPassword'>
          <Form.label>Re-enter Password</Form.label>
          <Form.Control type='password' placeholder='Re-enter Password'></Form.Control>
          <Form.text>Please Re-enter your password here</Form.text>
        </Form.Group>
        <Button variant="primary">Register</Button>
      </Form>
    </Container>
  )
}
export default Register