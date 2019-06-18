import React from 'react'
import { Button, Dropdown,Card,Progress, Statistic } from 'semantic-ui-react'
import Pet from './pet/Pet'
import './some.css'

class Home extends React.Component {

  
  constructor(){
    super();
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
          this.props.setMoney(this.props.state.money+1);
        }
      },10
    );
    setTimeout(() => {
      this.setState({petStyle:{}});
      clearInterval(interval);
    },10000);
  }

  componentDidMount() {
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
                      }
                    )
                  }
                )
                .then(
                  () => {
                    this.props.fetchUser(this.state.username)
                  }
                )
              }
            )
          }
        )
      },
       () => this.props.history.push("/"));
      //  debugger
  }

  handleLogoutClick = () => {
    this.props.logOut();
    this.props.history.push("/");
  }

  goShopping = (username) => {
    this.props.updatePet(username)
    return this.props.history.push("/store")
  }

  render() {
    const coinUrl = require(`../images/coin.png`)

    document
      .body
      .setAttribute('class', 'home_background')
      
    return (
      <React.Fragment>
        <div
          className="ui teal vertical animated large button"
          tabIndex="0" onClick={() => this.props.deleteApple(this.state.username)}>
          <div className="hidden content">Feed</div>
          <div className="visible content">
            <i className="utensils icon"></i>
          </div>
        </div>

        <div
          className="ui teal vertical animated large button"
          tabIndex="0"
          onClick={() => this.goShopping(this.state.username) }>
          <div className="hidden content">Shop</div>
          <div className="visible content">
            <i className="shop icon"></i>
          </div>
        </div>

        <div className="ui teal vertical animated large button" tabIndex="0" onClick={() => this.props.deleteMedicine(this.state.username)}>
          <div className="hidden content">Medicine</div>
          <div className="visible content">
            <i className="syringe icon"></i>
          </div>
        </div>

        <div className="ui teal vertical animated large button" tabIndex="0" onClick={() => this.props.deleteToy(this.state.username)}>
          <div className="hidden content">Play</div>
          <div className="visible content">
            <i className="futbol outline icon"></i>
          </div>
        </div>

        <div className="ui teal vertical animated large button" tabIndex="0" onClick={() => {this.walkPet()}}>
          <div className="hidden content">Walk</div>
          <div className="visible content">
            <i className="hand point right outline icon"></i>
          </div>
        </div>

        <div
          className="ui teal vertical animated large button"
          tabIndex="0" onClick={this.handleLogoutClick}>
          <div className="hidden content">Logout</div>
          <div className="visible content">
            <i className="sign-out icon"></i>
          </div>
        </div>

        <div>
          {(this.props.pet && !this.state.stillloading) ? <Pet style={this.state.petStyle} pet={this.props.pet} /> : <Button color='pink' className="redirect" onClick={this.redirectToHatch} >Let's hatch your new best friend!</Button>}
        </div>
        {this.props.pet?<Card>
          <label>{this.props.pet.name}</label>
          <label>Age: {this.props.pet.age}</label>
          <label><img className='coin' src={coinUrl}></img></label>
          <lable>Health</lable>
          <Progress percent={this.props.pet.health*10} color='red'/>
          <label>Hunger</label>
          <Progress percent={this.props.pet.hunger*10} color='green'/>
          <label>Fun</label>
          <Progress percent={this.props.pet.happiness*10} color='blue'/>
        </Card>:null}
        <Card>
        <Statistic>
        <Statistic.Value>{this.props.state.money}</Statistic.Value>
        <Statistic.Label>Coin(s)</Statistic.Label>
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
      </React.Fragment>
    )
  }
}

export default Home
