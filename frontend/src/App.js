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
import { connect } from 'react-redux';

class App extends React.Component {

  
  componentDidMount() {
  }

    buyApple = (username) => {
        if(this.props.user.money < 4) {
          alert("Not enough money")
          return
        }
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
                price: 4,
                filling: 1,
                healthy: true
              }
            })
        })
        .then(() => {
          this.props.subtractMoney(4)
          this.props.addFood(1)
        })
      }
    
      buyToy = (username) => {
        if(this.props.user.money < 8) {
          alert("Not enough money")
          return
        }
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
                price:8,
                fun: 1
              }
            })
        })
        .then(() => {
          this.props.subtractMoney(8);
          this.props.addToys(1)
        })
      }
    
      buyMedicine = (username) => {
        if(this.props.user.money < 15) {
          alert("Not enough money")
          return
        }
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
                incval: 2
              }
            })
        })
        .then(() => {
          this.props.subtractMoney(15);
          this.props.addMedicine(1);
        })
      }

  fetchUser = (username) => {
    return fetch(`${constants.apiUrl}/users/${username}`,
      {method:"GET",
      headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}}
        ).then(res=>res.json())
        .then(
            user => {
                    this.props.resetUser();
                    this.props.setName(username);
                    this.props.addMoney(user.money);
            }
        )
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
                this.props.subtractFood(this.props.user.food);
                this.props.addFood(num);
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
              this.props.subtractToys(this.props.user.toys);
              this.props.addToys(num);
            }
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
                  this.props.subtractMedicine(this.props.user.medicine);
                  this.props.addMedicine(num);
                }
        )
      }

    fetchCurrentPet = (username) => {
        return fetch(`${constants.apiUrl}/users/${username}/pets`,{method:"GET",
        headers:{"Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`}})
        .then(res=>res.json())
        .then(
            pets => {
              let currentPet = pets.find( pet => (pet.health > 0))
              this.props.resetPet();
              if(currentPet) {
                this.props.addHealth(currentPet.health);
                this.props.addHappiness(currentPet.happiness);
                this.props.addHunger(currentPet.hunger);
                this.props.addAge(currentPet.age);
                this.props.addStage(currentPet.stage);
                this.props.setType(currentPet.type);
                this.props.setEpitaph(currentPet.epitaph);
                this.props.setPetId(currentPet.id);
                this.props.setPetName(currentPet.name);
              }
            }
        )
    }

    updateMoney = (username, money) => {
      return fetch(`${constants.apiUrl}/users/${username}`, {
        method: 'PATCH',
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
        body: JSON.stringify({"data":{"money":money}})
      })
    }

    
    updatePet = (username) => {
      return fetch(`${constants.apiUrl}/pets/${this.props.pet.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
        body: JSON.stringify(
          {
            name: username,
            data: this.props.pet
          })
      })
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
                this.props.subtractFood(1);
                this.props.addHunger(1);
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
                this.props.subtractMedicine(1);
                this.props.addHealth(2);
                this.props.subtractHappiness(2);
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
                this.props.subtractToys(1);
                this.props.subtractHunger(1);
                if(this.props.pet.hunger < 2) {
                  this.props.subtractHappiness(1)
                } else {
                  this.props.addHappiness(1)
                }
                if(this.random(5)) {
                  this.props.subtractHealth(1)
                }
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
      return fetch(`${constants.apiUrl}/users/${username}`,
        {method:"GET",
          headers:{"Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`}} )
      .then(res=>res.json())
      .then(
        data => {
          this.props.subtractMoney(this.props.user.money);
          this.props.addMoney(data.money);
        }
      )
    }

    setMoney = (money) => {
      this.props.subtractMoney(this.props.user.money);
      this.props.addMoney(money);
    }

    setPetAttributes = (petAttributes,callback) => {
      var newPet = {...this.props.pet, ...petAttributes}
      this.props.resetPet();
      this.props.addHealth(newPet.health);
      this.props.addHappiness(newPet.happiness);
      this.props.addHunger(newPet.hunger);
      this.props.addAge(newPet.age);
      this.props.addStage(newPet.stage);
      this.props.setType(newPet.type);
      this.props.setEpitaph(newPet.epitaph);
      this.props.setPetId(newPet.id);
      this.props.setPetName(newPet.name);
      callback();
    }

    save = (username, money) => {
      if( this.props.pet && (Object.keys(this.props.pet).length > 0) ) {
        this.updatePet(username)
        this.updateMoney(username, money)
      }
    }

    logOut = () => {
      // fetchPet with 'PATCH' based on this.state.pet
        localStorage.setItem("token","");
        this.props.resetUser();
        this.props.resetPet();
    }


    

    render() {
        return (
            <Router>
                <Route exact path="/" render={(props) => <Login {...props} loggedIn={this.loggedIn} login={this.login} setMoney={this.setMoney} logOut={this.logOut} />} />
                <Route exact path="/register" render={(props) => <Register {...props} loggedIn={this.loggedIn} login={this.login} logOut={this.logOut} />} />
                <Route exact path="/home" render={(props) => <Home {...props}  setPetAttributes={this.setPetAttributes} fetchMoney={this.fetchMoney} setMoney={this.setMoney} fetchApples={this.fetchApples} fetchToys={this.fetchToys} fetchMedicine={this.fetchMedicine}  fetchCurrentPet={this.fetchCurrentPet} loggedIn={this.loggedIn} logOut={this.logOut} deleteApple={this.deleteApple} deleteMedicine={this.deleteMedicine} deleteToy={this.deleteToy} updatePet={this.updatePet} save={this.save}/>} />
                <Route exact path="/store" render={(props) => <Store {...props} user={this.props.user} loggedIn={this.loggedIn} logOut={this.logOut} buyApple={this.buyApple} buyToy={this.buyToy} buyMedicine={this.buyMedicine} updateMoney={this.updateMoney} />}  />
                <Route exact path="/graveyard" render={(props) => <Graveyard {...props} loggedIn={this.loggedIn} logOut={this.logOut} /> } />
                <Route exact path="/hatch" render={(props) => <Hatch {...props} fetchCurrentPet={this.fetchCurrentPet} loggedIn={this.loggedIn} logOut={this.logOut} />} />
            </Router>
        );
    }
}

const mapStateToProps = state => {
  return {
    pet: state.pet,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type:"SET_NAME",name}),
    addMoney: (change) => dispatch({type:"ADD_MONEY",change}),
    subtractMoney: (change) => dispatch({type:"SUBTRACT_MONEY",change}),
    addToys: (change) => dispatch({type:"ADD_TOYS",change}),
    subtractToys: (change) => dispatch({type:"SUBTRACT_TOYS",change}),
    addFood: (change) => dispatch({type:"ADD_FOOD",change}),
    subtractFood: (change) => dispatch({type:"SUBTRACT_FOOD",change}),
    addMedicine: (change) => dispatch({type:"ADD_MEDICINE",change}),
    subtractMedicine: (change) => dispatch({type:"SUBTRACT_MEDICINE",change}),
    addHealth: (change) => dispatch({type:"ADD_HEALTH",change}),
    subtractHealth: (change) => dispatch({type:"SUBTRACT_HEALTH",change}),
    addHappiness: (change) => dispatch({type:"ADD_HAPPINESS",change}),
    subtractHappiness: (change) => dispatch({type:"SUBTRACT_HAPPINESS",change}),
    addHunger: (change) => dispatch({type:"ADD_HUNGER",change}),
    subtractHunger: (change) => dispatch({type:"SUBTRACT_HUNGER",change}),
    addAge: (change) => dispatch({type:"ADD_AGE",change}),
    addStage: (change) => dispatch({type:"ADD_STAGE",change}),
    setType: (pokemonType) => dispatch({type:"SET_TYPE",pokemonType}),
    setEpitaph: (epitaph) => dispatch({type:"SET_EPITAPH",epitaph}),
    setPetId: (id) => dispatch({type:"SET_PET_ID",id}),
    setPetName: (name) => dispatch({type:"SET_PET_NAME",name}),
    resetUser: () => dispatch({type:"RESET_USER"}),
    resetPet: () => dispatch({type:"RESET_PET"})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
