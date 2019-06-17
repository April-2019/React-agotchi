import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import {Container} from 'react-bootstrap'

export default class App extends React.Component {
    state = {
        loggedIn: false
    }

    fetchUserInfo = () => {

    }

    register = () => {
        console.log()
    }

    render() {
        return(
        <div bsPrefix='login_form'>
            <h1>Hello</h1>
            {this.state.loggedIn?<Home />:<Login register={this.register}/>}
        </div>
        )
    }
}