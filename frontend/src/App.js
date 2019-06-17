import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home'
import Store from './components/Store'
import Register from './components/Register'
import Graveyard from './components/Graveyard'
import Hatch from './components/Hatch'
import 'semantic-ui-css/semantic.min.css'
import {Container} from 'react-bootstrap'
import constants from './constants'
export default class App extends React.Component {
  
    componentDidMount() {
    }

    loggedIn = (successCallback, failureCallback) => {
        fetch(`${constants.apiUrl}/loggedin`,
        {method:"GET",
        headers:{"Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`}})
        .then(res=> res.json())
        .then(
            data => {
                if(data.user) {
                    successCallback(data.user);
                } else {
                    failureCallback();
                }
            }
        );
    }

    login = (username,password,callback) => {
        fetch(`${constants.apiUrl}/login`,
        {method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"name":username,"password":password})} )
        .then(res => res.json())
        .then( data => {
        if ( data.success === "Approved" ) {
            localStorage.setItem("token",data.token);
            callback();
        }
        });
    }


    logOut = () => {
        localStorage.setItem("token","");
    }

    

    render() {
        return (
            <Router>
                <Route exact path="/" render={(props) => <Login {...props} loggedIn={this.loggedIn} login={this.login} logOut={this.logOut} />} />
                <Route exact path="/register" render={(props) => <Register {...props} loggedIn={this.loggedIn} login={this.login} logOut={this.logOut} />} />
                <Route exact path="/home" render={(props) => <Home {...props} loggedIn={this.loggedIn} logOut={this.logOut} />} />
                <Route exact path="/store" render={(props) => <Store {...props} loggedIn={this.loggedIn} logOut={this.logOut} />}  />
                <Route exact path="/graveyard" render={(props) => <Graveyard {...props} loggedIn={this.loggedIn} logOut={this.logOut} /> } />
                <Route exact path="/hatch" render={(props) => <Hatch {...props} loggedIn={this.loggedIn} logOut={this.logOut} />} />

            </Router>
        );
    }
}
