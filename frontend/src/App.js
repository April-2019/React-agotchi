import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import 'semantic-ui-css/semantic.min.css'

export default class App extends React.Component {
    state = {
        users: [],
        loggedIn: false,
        username: '',
        password: ''
    }

    fetchUserInfo = () => {

    }

    username = (e) => {
        this.setState({
            username: e.target.value
        })

    }

    password = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    retypePassword = (e) => {

    }

    register = (e) => {

        console.log()
    }

    login = (e) => {
        e.preventDefault()
        this.setState({
            loggedIn:true
        })
        // fetch('http://localhost:8000/users/login', {
        //   method: 'POST',
        //   headers:{
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     username: this.state.username,
        //     password: this.state.password
        //   })
        // })
        // .then(res => res.json())
        // .then(data => {
        //   this.setState({
        //     curretuser: data.username
        //   })
          
        //   localStorage.token = data.token
        //   // localStorage.setItem('token', data.token)
    
        //   fetch('http://localhost:8000/',{
        //   method:'GET',
        //   headers:{
        //       Authorization: `Bearer ${localStorage.token}`
        //   }})
        //   .then(res => res.json())
        //   .then(data => {
        //     this.setState({
        //     })
        //   })   
        // })   
      }
    

    render() {
        return(
        <div>
            <h1>Hello</h1>
            {this.state.loggedIn?<Home />:<Login register={this.register} username={this.username} password={this.password} retypePassword={this.retypePassword} login={this.login}/>}
        </div>
        )
    }
}