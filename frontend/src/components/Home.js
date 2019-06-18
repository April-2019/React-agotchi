import React from 'react'
import { Button, Dropdown,Card,Progress, Statistic } from 'semantic-ui-react'
import Pet from './pet/Pet'
import './some.css'

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
          this.props.setMoney(this.props.state.money+2);
        }
      },10
    );
    setTimeout(() => {
      this.setState({petStyle:{}});
      clearInterval(interval);
    },10000);
  }


  setupIntervals = () => {
    // this.healthInterval = setInterval( this.doHealthInterval , 30000 )
    // this.funInterval = setInterval( this.doFunInterval, 17000 )
    // this.ageInterval = setInterval( this.doAgeInterval, 40000 )
    // this.hungerInterval = setInterval( this.doHungerInterval, 25000 )
    // this.deathInterval = setInterval( this.doDeathInterval, 1000 )
    // this.stageInterval = setInterval( this.doStageInterval, 1000 )


    this.petUpdateInterval = setInterval(this.doPetUpdateInterval,1000)

  }


  doPetUpdateInterval = () => {
    this.m++

    if( this.props.state.pet && (Object.keys(this.props.state.pet).length > 0) ) {

      var attributeChanged = false;
      var newHealth = this.props.state.pet.health;
      var newHappiness = this.props.state.pet.happiness;
      var newAge = this.props.state.pet.age;
      var newHunger = this.props.state.pet.hunger;
      var newStage = this.props.state.pet.stage;

      if( (this.m%17 === 0) && ( newHunger > 0 ) ) {
        newHunger--;
        attributeChanged = true;
      }

      if( (this.m%15 === 0) && (newHunger < 4) && (newHealth > 0) ) {
        newHealth--;
        attributeChanged = true;
      }

      if( this.m % 30 === 0 ) {
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

      if( (newAge === 10) && (newStage !== 3) ) {
        newStage = 3;
        attributeChanged = true;
      }

      if( this.m % 20 === 0 ) {
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
            this.props.save(this.state.username, this.props.state.money);
        });
      }
    }
  }


  // doStageInterval = () => {
  //   if(  this.props.state.pet && (Object.keys(this.props.state.pet).length > 0) ) {
  //     if(this.props.state.pet.age === 5) {
  //       this.props.setPetAttributes( { stage: 2 } );
  //     }

  //     if(this.props.state.pet.age === 10) {
  //       this.props.setPetAttributes( {stage: 3} );
  //     }
  //   }
  // }

  // doHealthInterval = () => {
  //   if( (this.props.state.pet) && (Object.keys(this.props.state.pet).length > 0) && (this.props.state.pet.hunger < 4) && (this.props.state.pet.health > 0) ) {
  //     this.props.setPetAttributes( {health: this.props.state.pet.health - 1})
  //   }
  // }

  // doFunInterval = () => {
  //   if( this.props.state.pet && (Object.keys(this.props.state.pet).length > 0) ) {
  //     var numToSubtract = 0;

  //     if( this.props.state.pet.happiness > 0) {
  //       numToSubtract = 1;
  //     }

  //     if((this.props.state.pet.hunger <= 3) && (this.props.state.pet.happiness > 1)) {
  //       numToSubtract = 2; 
  //     }

  //     this.props.setPetAttributes( { happiness: this.props.state.pet.happiness - numToSubtract } );
  //   }
  // }

  // doAgeInterval = () => {
  //   if( this.props.state.pet && (Object.keys(this.props.state.pet).length > 0) ) {
  //     if(this.props.state.pet.age < 10) {
  //       this.props.setPetAttributes({ age: this.props.state.pet.age + 1 } );
  //     }
  //   }
  // }

  // doHungerInterval = () => {
  //   if( this.props.state.pet && (Object.keys(this.props.state.pet).length > 0) ) {
  //     if( this.props.state.pet.hunger > 0) {
  //       this.props.setPetAttributes({hunger: this.props.state.pet.hunger - 1});
  //     }
  //   }
  // }

  // doDeathInterval = () => {
  //   if( this.props.state.pet && (Object.keys(this.props.state.pet).length > 0) ) {
  //     if( this.props.state.pet.age >= 50 ) {
  //       this.props.setPetAttributes({health:0})
  //       // TODO: autosave here
  //     }
  //   }
  // }



  componentWillUnmount() {
    // clearInterval(this.healthInterval);
    // clearInterval(this.funInterval);
    // clearInterval(this.ageInterval);
    // clearInterval(this.hungerInterval);
    // clearInterval(this.deathInterval);
    // clearInterval(this.stageInterval);
    clearInterval(this.petUpdateInterval);
  }




  componentDidMount() {
    this.autoSaveInterval = setInterval(()=>{this.props.save(this.state.username, this.props.state.money)}, 20000)
    this
      .props
      .loggedIn((username) => {
        this.setState({username:username});
        this.props.fetchCurrentPet(this.state.username)
        .then(() => {this.setState({
          stillloading: false
        })})
        .then(
          () => {
            this.props.fetchApples(this.state.username)
            .then(
              () => {
                this.props.fetchToys(this.state.username)
                .then(
                  () => {
                    this.props.fetchMedicine(this.state.username)
                    .then(
                      () => {
                        this.props.fetchMoney(this.state.username)
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

  componentWillUnmount() {
    clearInterval(this.autoSaveInterval)
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

  render() {
    const coinUrl = require(`../images/coin.png`)
    document
      .body
      .setAttribute('class', 'home_background')
      
    return (
      <React.Fragment>
        {(this.props.pet && !this.state.stillloading)
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

        {(this.props.pet && !this.state.stillloading)
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


        {(this.props.pet && !this.state.stillloading)
        ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => this.props.deleteMedicine(this.state.username)}>
          <div className="hidden content">Medicine</div>
          <div className="visible content">
            <i className="syringe icon"></i>
          </div>
        </div>
        :
        null}


        {(this.props.pet && !this.state.stillloading)
        ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => this.props.deleteToy(this.state.username)}>
          <div className="hidden content">Play</div>
          <div className="visible content">
            <i className="futbol outline icon"></i>
          </div>
        </div>
        :
        null}
 
        {(this.props.pet && !this.state.stillloading)
         ?
        <div className="ui pink vertical animated large button" tabIndex="0" onClick={() => {this.walkPet()}}>
          <div className="hidden content">Walk</div>
          <div className="visible content">
            <i className="map outline icon"></i>
          </div>
        </div>
        :
        null}

<Button.Group className='btns'>
    <Button positive onClick={() => this.props.save(this.state.username, this.props.state.money)}>Save</Button>
    <Button.Or />
    <Button color='red' onClick={() => this.handleLogoutClick()}>Logout</Button>
  </Button.Group>
        

        <div>
          {(this.props.pet && !this.state.stillloading) ? <Pet style={this.state.petStyle} pet={this.props.pet} /> : <Button color='pink' className="redirect" onClick={this.redirectToHatch} >Let's hatch your new best friend!</Button>}
        </div>
        {this.props.pet?<Card>
          <label>{this.props.pet.name}</label>
          <label>Age: {this.props.pet.age}</label>
          <label>Health: {this.props.pet.health}</label>
          <Progress percent={this.props.pet.health*10} color='red'/>
          <label>Hunger: {this.props.pet.hunger}</label>
          <Progress percent={this.props.pet.hunger*10} color='green'/>
          <label>Fun: {this.props.pet.happiness}</label>
          <Progress percent={this.props.pet.happiness*10} color='blue'/>
        </Card>:null}

        {(this.props.pet && !this.state.stillloading)
        ?
        <Card>
        <Statistic>
        <Statistic.Value>{this.props.state.money}</Statistic.Value>
        <Statistic.Label><img src={coinUrl} className="coin" /></Statistic.Label>
      </Statistic>
        <Statistic.Group size='tiny'>
        <Statistic>
        <Statistic.Value>{this.props.state.apple}</Statistic.Value>
        <Statistic.Label>Apple(s)</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{this.props.state.medicine}</Statistic.Value>
        <Statistic.Label>Potion(s)</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{this.props.state.toys}</Statistic.Value>
        <Statistic.Label>Toys</Statistic.Label>
      </Statistic>
    </Statistic.Group>

    </Card>
    : null }
      </React.Fragment>
    )
  }
}

export default Home
