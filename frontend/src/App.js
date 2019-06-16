import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home'
import Store from './components/Store'
import Register from './components/Register'
import Graveyard from './components/Graveyard'
import {Container} from 'react-bootstrap'

export default class App extends React.Component {

    componentDidMount() {
        
    }

    loggedIn = (successCallback, failureCallback) => {
        fetch('http://localhost:8000/loggedin')
        .then(res=> res.json())
        .then(
            data => {
                if(data.user) {
                    successCallback();
                } else {
                    failureCallback();
                }
            }
        );
    }

    render() {
        return (
            <Router>
                <Route exact path="/" render={(props) => <Login {...props} loggedIn={this.loggedIn} />} />
                <Route exact path="/register" render={(props) => <Register {...props} loggedIn={this.loggedIn} />} />
                <Route exact path="/home" render={(props) => <Home {...props} loggedIn={this.loggedIn} />} />
                <Route exact path="/store" render={(props) => <Store {...props} loggedIn={this.loggedIn} />} />
                <Route exact path="/graveyard" render={(props) => <Graveyard {...props} loggedIn={this.loggedIn} /> } />
            </Router>
        );
    }
}
