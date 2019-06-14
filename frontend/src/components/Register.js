import React from 'react'
import {Form, Container, Col, Button} from 'react-bootstrap'

const Register = (props) => {
  return (
    <Container>
      <Form>
        <Form.Group controlId='formRegisterUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter Username'></Form.Control>
          <Form.Text>Please enter your username here</Form.Text>
        </Form.Group>
        <Form.Group controlId='formRegisterPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password'></Form.Control>
          <Form.Text>Please enter your password here</Form.Text>
        </Form.Group>
        <Form.Group controlId='formRegisterReenterPassword'>
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type='password' placeholder='Re-enter Password'></Form.Control>
          <Form.Text>Please Re-enter your password here</Form.Text>
        </Form.Group>
        <Button variant="outline-primary" type='submit'>Register</Button>
        <Button variant="outline-secondary" onClick={() => props.goBack()}>Back To Login</Button>
      </Form>
    </Container>
  )
}
export default Register