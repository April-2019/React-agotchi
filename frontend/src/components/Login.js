import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import Register from './Register'
class Login extends React.Component {

  state = {
    register: false
  }

  register = () => {
    this.setState({register: true})
  }

  goBack = () => {
    this.setState({register: false})
  }

  render() {
    document.body.setAttribute('class', 'homepage_background')
    return (this.state.register
      ? <Register goBack={this.goBack}/>
      : <Container>
          <Form onSubmit={(e) => this.props.login(e)}>
            <div className='login_background'>
             <Row className="justify-content-center">
          <Form.Group as={Col} xs={8} sm={7} md={6} lg={5} xl={4} controlId='formLoginUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' placeholder='Enter Username' name="userName" onChange={(e) => this.props.username(e)}/>
            <Form.Text>Please enter your username here</Form.Text>
          </Form.Group>
          </Row>
          <Row className="justify-content-center">
          <Form.Group as={Col} xs={8} sm={7} md={6} lg={5} xl={4} controlId='formLoginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password' onChange={(e) => this.props.password(e)}></Form.Control>
              <Form.Text>Please enter your password here</Form.Text>
              <Button variant="outline-primary" type="submit">Login</Button>
              <Button variant="outline-success" onClick={this.register}>Register</Button>
            </Form.Group>
            </Row>
          </div>
        </Form>
      </Container>
    )
  }
}

export default Login