import React from 'react'
import { Button, Dropdown,Card,Progress, Statistic } from 'semantic-ui-react'
import Pet from './pet/Pet'
import './some.css'

import { connect } from 'react-redux';

class Home extends React.Component {

  
  constructor(){
    super();
    this.m = 0
    this.state={
      stillloading: true,
      username:"",
      petStyle:{}
    }
  }
  redirectToHatch = () => {
    this.props.history.push('/hatch')
  }

  walkPet = () => {
    this.setState({petStyle:{"position":"absolute","left":`${400}px`,"top":`200px`}});
    var interval = setInterval(
      () => {
        var curPos = parseInt(this.state.petStyle.left.split("p")[0])
        this.setState({petStyle:{"position":"absolute","left":`${curPos+1}px`,"top":`200px`}});
        if(Math.random() < 0.0075) {
          this.props.setMoney(this.props.user.money+2);
        }
      },10
    );
    setTimeout(() => {
      this.setState({petStyle:{}});
      clearInterval(interval);
    },10000);
  }


  setupIntervals = () => {
    this.petUpdateInterval = setInterval(this.doPetUpdateInterval,5000)
  }


  doPetUpdateInterval = () => {
    this.m++

    if( this.props.pet && (Object.keys(this.props.pet).length > 0) ) {

      var arbitraryNumber = 3;
      var attributeChanged = false;
      var newHealth = this.props.pet.health;
      var newHappiness = this.props.pet.happiness;
      var newAge = this.props.pet.age;
      var newHunger = this.props.pet.hunger;
      var newStage = this.props.pet.stage;

      if( (this.m%arbitraryNumber === 0) && ( newHunger > 0 ) ) {
        newHunger--;
        attributeChanged = true;
      }

      if( (this.m%arbitraryNumber === 0) && (newHunger < 4) && (newHealth > 0) ) {
        newHealth--;
        attributeChanged = true;
      }

      if( this.m % arbitraryNumber === 0 ) {
        newAge++;
        attributeChanged = true;
      }

      if( (newAge > 50) && (newHealth > 0) ) {
        newHealth = 0
        attributeChanged = true;
      }

      if( (newAge === 5) && (newStage !== 2) ) {
        newStage = 2;
        attributeChanged = true;
      }

      if( (newAge === 7) && (newStage !== 3) ) {
        newStage = 3;
        attributeChanged = true;
      }

      if( this.m % arbitraryNumber === 0 ) {
        if(newHappiness > 0) {
          newHappiness--;
          attributeChanged = true;
        }

        if((newHunger < 4) && (newHappiness > 0)) {
          newHappiness--;
          attributeChanged = true;
        }
      }



      if(attributeChanged) {

        this.props.setPetAttributes( { 
          health: newHealth,
          happiness: newHappiness,
          age: newAge,
          hunger: newHunger,
          stage: newStage
        }, 
          () => {
            this.props.save(this.state.username, this.props.user.money);
        });
      }
    }
  }




  componentWillUnmount() {
    clearInterval(this.petUpdateInterval);
  }




  componentDidMount() {
    this
      .props
      .loggedIn((username) => {
        this.setState({username:username});
        this.props.fetchCurrentPet(username)
        .then(() => {this.setState({
          stillloading: false
        })})
        .then(
          () => {
            this.props.fetchApples(username)
            .then(
              () => {
                this.props.fetchToys(username)
                .then(
                  () => {
                    this.props.fetchMedicine(username)
                    .then(
                      () => {
                        this.props.fetchMoney(username)
                        .then( () => this.setupIntervals() );
                      }
                    )
                  }
                )
              }
            )
          }
        )
      },
       () => this.props.history.push("/"));
  }


  handleLogoutClick = () => {
    this.props.logOut();
    this.props.history.push("/")
    // .then(clearInterval(autoSave))
  }

  goShopping = (username) => {
    this.props.updatePet(username)
    .then(res=>res.json())
    .then(() => this.props.history.push("/store"))
  }

  hasPet = () => {
    return !this.state.stillloading && (this.props.pet.type !== "")
  }

  render() {
    const coinUrl = require(`../images/coin.png`)
    document
      .body
      .setAttribute('class', 'home_background')
      
    return (
      <React.Fragment>
        {(this.hasPet() && !this.state.stillloading)
        ?
        <div
          className="ui pink vertical animated large button"
          tabIndex="0" onClick={() => this.props.deleteApple(this.state.username)}>
          <div className="hidden content">Feed</div>
          <div className="visible content">
            <i className="utensils icon"></i>
          </div>
        </div>
        :
        null}

        {(this.hasPet() && !this.state.stillloading)
        ?
        <div
          className="ui pink vertical animated large button"
          tabIndex="0"
          onClick={() => this.goShopping(this.state.username) }>
          <div className="hidden content">Shop</div>
          <div className="visible content">
            <i className="shop icon"></i>
          </div>
        </div>
        :
        null}


        {(this.hasPet() && !this.state.stillloading)
        ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => this.props.deleteMedicine(this.state.username)}>
          <div className="hidden content">Medicine</div>
          <div className="visible content">
            <i className="syringe icon"></i>
          </div>
        </div>
        :
        null}


        {(this.hasPet() && !this.state.stillloading)
        ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => this.props.deleteToy(this.state.username)}>
          <div className="hidden content">Play</div>
          <div className="visible content">
            <i className="futbol outline icon"></i>
          </div>
        </div>
        :
        null}
 
        {(this.hasPet() && !this.state.stillloading)
         ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => {this.walkPet()}}>
          <div className="hidden content">Walk</div>
          <div className="visible content">
            <i className="map outline icon"></i>
          </div>
        </div>
        :
        null}

        {(this.hasPet() && !this.state.stillloading)
         ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => {this.props.history.push("/graveyard")}}>
          <div className="hidden content">Graveyard</div>
          <div className="visible content">
            <i className="chess king icon"></i>
          </div>
        </div>
        :
        null}

<Button.Group className='btns'>
    <Button positive onClick={() => this.props.save(this.state.username, this.props.user.money)}>Save</Button>
    <Button.Or />
    <Button color='red' onClick={() => this.handleLogoutClick()}>Logout</Button>
  </Button.Group>
        

        <div>
          {(this.hasPet() && !this.state.stillloading) ? <Pet pet={this.props.pet} style={this.state.petStyle} /> : <Button color='pink' className="redirect" onClick={this.redirectToHatch} >Let's hatch your new best friend!</Button>}
        </div>
        {this.hasPet()?<Card>
          <label>{this.props.pet.name}</label>
          <label>Age: {this.props.pet.age}</label>
          <label>Health: {this.props.pet.health}</label>
          <Progress percent={this.props.pet.health*10} color='red'/>
          <label>Fullness: {this.props.pet.hunger}</label>
          <Progress percent={this.props.pet.hunger*10} color='green'/>
          <label>Fun: {this.props.pet.happiness}</label>
          <Progress percent={this.props.pet.happiness*10} color='blue'/>
        </Card>:null}

        {(this.hasPet() && !this.state.stillloading)
        ?
        <Card>
        <Statistic>
        <Statistic.Value>{this.props.user.money}</Statistic.Value>
        <Statistic.Label><img src={coinUrl} className="coin" /></Statistic.Label>
      </Statistic>
        <Statistic.Group size='tiny'>
        <Statistic>
        <Statistic.Value>{this.props.user.food}</Statistic.Value>
        <Statistic.Label>Apple(s)</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{this.props.user.medicine}</Statistic.Value>
        <Statistic.Label>Potion(s)</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{this.props.user.toys}</Statistic.Value>
        <Statistic.Label>Toys</Statistic.Label>
      </Statistic>
    </Statistic.Group>

    </Card>
    : null }
      </React.Fragment>
    )
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
    resetUser: () => dispatch({type:"RESET_USER"}),
    resetPet: () => dispatch({type:"RESET_PET"})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
