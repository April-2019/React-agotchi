import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'

const Register = (props) => {
  return (
    <Container>
      <Form onSubmit={(e) => this.props.login(e)}>
        <div className='register_background'>
          <Row className="justify-content-center">
            <Form.Group
              as={Col}
              xs='auto'
              sm='auto'
              md='auto'
              lg='auto'
              controlId='formLoginUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter Username' name="userName"/>
              <Form.Text>Please enter your username here</Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group
              as={Col}
              xs='auto'
              sm='auto'
              md='auto'
              lg='auto'
              xl='auto'
              controlId='formLoginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password'></Form.Control>
              <Form.Text>Please enter your password here</Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group controlId='formRegisterReenterPassword'>
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type='password' placeholder='Re-enter Password'></Form.Control>
              <Form.Text>Please Re-enter your password here</Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
          <Button variant="outline-primary" type='submit'>Register</Button>
          <Button variant="outline-secondary" onClick={() => props.goBack()}>Back To Login</Button>
          </Row>
        </div>
      </Form>
    </Container>
  )
}
export default Register