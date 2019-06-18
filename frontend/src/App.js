import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home'
import Store from './components/Store'
import Register from './components/Register'
import Graveyard from './components/Graveyard'
import Hatch from './components/Hatch'
import 'semantic-ui-css/semantic.min.css'
import {Message} from 'semantic-ui-react'
import {Container} from 'react-bootstrap'
import constants from './constants'
export default class App extends React.Component {

    state = {
        apple: 0,
        medicine: 0,
        toys: 0,
        money: 0,
        pet: {}
      }

  
    componentDidMount() {
    }

    buyApple = (username) => {
        fetch(`${constants.apiUrl}/foods`, {
          method: 'POST',
          headers: {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
          body: JSON.stringify(
            {
              name: username,
              data:{
                name: 'apple',
                price: 40,
                filling: 7,
                healthy: true
              }
            })
        })
        .then(this.setState({apple: this.state.apple+1}))
      }
    
      buyToy = (username) => {
        fetch(`${constants.apiUrl}/toys`, {
          method: 'POST',
          headers: {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
          body: JSON.stringify(
            {
              name: username,
              data:{
                name: 'toy',
                price: 20,
                fun: 5
              }
            })
        })
        .then(this.setState({toys:this.state.toys+1}))
      }
    
      buyMedicine = (username) => {
        fetch(`${constants.apiUrl}/healths`, {
          method: 'POST',
          headers: {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
          body: JSON.stringify(
            {
              name: username,
              data:{
                name: 'Potion',
                price: 15,
                incval: 3
              }
            })
        })
        .then(this.setState({medicine:this.state.medicine+1}))
      }


    fetchApples = (username) => {
        return fetch(`${constants.apiUrl}/users/${username}/foods`,
          {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}}
        ).then(res=>res.json())
        .then(
            foods => {
                let num = foods.filter(food => food.name === 'apple').length
                          this.setState({apple: num})
            }
        )
      }

    fetchToys = (username) => {
        return fetch(`${constants.apiUrl}/users/${username}/toys`,
          {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}}
        ).then(res=>res.json())
        .then(
            toys => {
              let num = toys.filter(toy => toy.name === 'toy').length
              this.setState({toys: num})}
          );
    }

    fetchMedicine = (username) => {
        return fetch(`${constants.apiUrl}/users/${username}/healths`,
          {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}}
        ).then(res=>res.json())
        .then(
            healths => {
                  let num = healths.filter(medicine => medicine.name === 'Potion').length
                  this.setState({medicine: num})}
        )
      }

    fetchCurrentPet = (username) => {
        return fetch(`${constants.apiUrl}/users/${username}/pets`,{method:"GET",
        headers:{"Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`}})
        .then(res=>res.json())
        .then(
            pets => {
                this.setState({pet: pets.find( pet => (pet.health > 0) ) });
            }
        )
    }

    deleteApple = (username) => {
      fetch(`${constants.apiUrl}/users/${username}/foods`,
      {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}})
      .then(res=>res.json()).then(
        foods => {
          let apples = foods.filter(food => (food.name === "apple"))
          if(apples.length > 0) {
            let appleId = apples[0].id
            fetch(`${constants.apiUrl}/foods/${appleId}`,
              {method:"DELETE",
               headers:{"Content-Type":"application/json",
               "Authorization":`Bearer ${localStorage.getItem("token")}`}}
            ).then(
              () => {
                this.setState({
                  apple:this.state.apple-1,
                  pet: {
                    ...this.state.pet,
                    hunger:this.state.pet.hunger+0.7>10?10:this.state.pet.hunger+0.7
                  }
                })
              }
            )
          } else {alert('You need more food!')}
        }
      )
    }

    deleteMedicine = (username) => {
      fetch(`${constants.apiUrl}/users/${username}/healths`,
      {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}})
      .then(res=>res.json()).then(
        healths => {
          let medicines = healths.filter(health => (health.name === "Potion"))
          if(medicines.length > 0) {
            let medicineId = medicines[0].id
            fetch(`${constants.apiUrl}/healths/${medicineId}`,
              {method:"DELETE", 
               headers:{"Content-Type":"application/json",
               "Authorization":`Bearer ${localStorage.getItem("token")}`}}
            ).then(
              () => {
                this.setState({
                  medicine:this.state.medicine-1,
                  pet:{
                    ...this.state.pet,
                    health: this.state.pet.health+2.5>10?10:this.state.pet.health+2.5
                  }
                })
              }
            )
          }
        }
      )
    }

    deleteToy = (username) => {
      fetch(`${constants.apiUrl}/users/${username}/toys`,
      {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}})
      .then(res=>res.json()).then(
        toys => {
          let newToys = toys.filter(toy => (toy.name === "toy"))
          if(newToys.length > 0) {
            let toyId = toys[0].id
            fetch(`${constants.apiUrl}/toys/${toyId}`,
              {method:"DELETE", 
               headers:{"Content-Type":"application/json",
               "Authorization":`Bearer ${localStorage.getItem("token")}`}}
            ).then(
              () => {
                this.setState({
                  toys:this.state.toys-1,
                  pet: {
                    ...this.state.pet,
                    hunger:this.state.pet.hunger>=0.5?this.state.pet.hunger-0.5:0,
                    happiness: this.state.pet.hunger>2?this.state.pet.happiness+0.5:this.state.pet.happiness-0.2,
                    health: this.random(5)?this.state.pet.health-1:this.state.pet.health
                  }
                })
              }
            )
          } else {alert('You need more toys!')}
        }
      )
    }

    random = (percent) => {
      let a = [1,2,3,4,5,6,7,8,9,10]
      let b = a[Math.floor(Math.random() * a.length)]
      if(b<percent){ return true} else {return false}
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
                    successCallback(data.user)
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

    fetchMoney = (username) => {
      fetch(`${constants.apiUrl}/users/${username}`,
        {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}} )
      .then(res=>res.json())
      .then(
        data => this.setState({money:data.money})
      )
    }

    setMoney = (money) => {
      this.setState({money:money});
    }


    logOut = () => {
      // fetchPet with 'PATCH' based on this.state.pet
        localStorage.setItem("token","");
        this.setState({
            apple: 0,
            medicine: 0,
            toys: 0,
            money: 0,
            pet: {}
        })
    }

  // redirectToHatch = () => {
  //   this.props.history
  // }

  

    

    render() {
        return (
            <Router>
                <Route exact path="/" render={(props) => <Login {...props} loggedIn={this.loggedIn} login={this.login} setMoney={this.setMoney} logOut={this.logOut} />} />
                <Route exact path="/register" render={(props) => <Register {...props} loggedIn={this.loggedIn} login={this.login} logOut={this.logOut} />} />
                <Route exact path="/home" render={(props) => <Home {...props} state={this.state} fetchMoney={this.fetchMoney} setMoney={this.setMoney} fetchApples={this.fetchApples} fetchToys={this.fetchToys} fetchMedicine={this.fetchMedicine} pet={this.state.pet}  fetchCurrentPet={this.fetchCurrentPet} loggedIn={this.loggedIn} logOut={this.logOut} deleteApple={this.deleteApple} deleteMedicine={this.deleteMedicine} deleteToy={this.deleteToy}/>} />
                <Route exact path="/store" render={(props) => <Store {...props} state={this.state} loggedIn={this.loggedIn} logOut={this.logOut} buyApple={this.buyApple} buyToy={this.buyToy} buyMedicine={this.buyMedicine}/>}  />
                <Route exact path="/graveyard" render={(props) => <Graveyard {...props} loggedIn={this.loggedIn} logOut={this.logOut} /> } />
                <Route exact path="/hatch" render={(props) => <Hatch {...props} pet={this.state.pet} fetchCurrentPet={this.fetchCurrentPet} loggedIn={this.loggedIn} logOut={this.logOut} />} />
            </Router>
        );
    }
}
