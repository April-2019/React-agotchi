import React from 'react'
import Login from './components/Login'
import Home from './components/Home'

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
            <div>
                <h1>Hello</h1>
                {this.state.loggedIn?<Home />:<Login register={this.register}/>}
            </div>
        )
    }
}