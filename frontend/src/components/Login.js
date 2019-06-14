import React from 'react'
import {Form, Container, Col, Button, Row} from 'react-bootstrap'
import Register from './Register'

class Login extends React.Component {

    state = {
        register: false
    }


    register = () => {
        this.setState({
            register: true 
        })  
    }

    goBack = () => {
        this.setState({
            register: false
        })
    }

    render() {
        return (
            this.state.register?<Register goBack={this.goBack}/>
            :
            <div className='login_background'>
                <Container className='login_form'>
                    <Form onSubmit={(e) => this.props.login(e)}>
                    
                        <Form.Group as={Col} lg={4} controlId='formLoginUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder='Enter Username' name="userName"/>
                            <Form.Text>Please enter your username here</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} lg={4} controlId='formLoginPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password'></Form.Control>
                            <Form.Text>Please enter your password here</Form.Text>
                            <Button variant="outline-primary" type="submit">Login</Button>
                            <Button variant="outline-success" onClick={this.register}>Register</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default Login