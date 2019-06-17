import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home'
import Store from './components/Store'
import Register from './components/Register'
import Graveyard from './components/Graveyard'
import {Container} from 'react-bootstrap'
export default class App extends React.Component {

    state = {
        apple: 0,
        medicine: 0,
        toys: []
      }
  
    componentDidMount() {
    }

    loggedIn = (successCallback, failureCallback) => {
        fetch('http://localhost:8000/loggedin',
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
        fetch("http://localhost:8000/login",
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
        this.setState({
            apple: 0,
            medicine: 0,
            toys: []
        })
    }

    buyApple = () => {
    fetch('http://localhost:8000/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    })
    .then(
      this.props.setState({
          apple: this.state.apple+1
      })
    )
  }

  buyToy = () => {
    fetch('http://localhost:8000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    })
    .then(
      this.props.setState({
          apple: this.state.apple+1
      })
    )
  }

  buyHealthItem = () => {
    fetch('http://localhost:8000/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    })
    .then(
      this.props.setState({
          apple: this.state.apple+1
      })
    )
  }

  

    

    render() {
        return (
            <Router>
                <Route exact path="/" render={(props) => <Login {...props} loggedIn={this.loggedIn} login={this.login} logOut={this.logOut} />} />
                <Route exact path="/register" render={(props) => <Register {...props} loggedIn={this.loggedIn} login={this.login} logOut={this.logOut} />} />
                <Route exact path="/home" render={(props) => <Home {...props} loggedIn={this.loggedIn} logOut={this.logOut} />} />
                <Route exact path="/store" render={(props) => <Store {...props} loggedIn={this.loggedIn} logOut={this.logOut} buyApple={this.buyApple} buyToy={this.buyToy} buyHealthItem={this.buyHealthItem}/>}  />
                <Route exact path="/graveyard" render={(props) => <Graveyard {...props} loggedIn={this.loggedIn} logOut={this.logOut} /> } />
            </Router>
        );
    }
}
