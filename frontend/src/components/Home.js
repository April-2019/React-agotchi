import React from 'react'
import {Card, Progress} from 'semantic-ui-react'

class Home extends React.Component {

  state = {username:""}

  componentDidMount() {
    this
      .props
      .loggedIn((username) => {
        this.setState({username:username});
        this.props.fetchCurrentPet(this.state.username)
        .then(
          () => {
            this.props.fetchApples(this.state.username)
            .then(
              () => {
                this.props.fetchToys(this.state.username)
                .then(
                  () => {
                    this.props.fetchMedicine(this.state.username)
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
    this
      .props
      .logOut();
    this
      .props
      .history
      .push("/");
  }

  render() {
    document
      .body
      .setAttribute('class', 'home_background')
      
    return (
      <React.Fragment>
        <div
          className="ui teal vertical animated button"
          tabIndex="0">
          <div className="hidden content">Feed</div>
          <div className="visible content">
            <i className="utensils icon"></i>
          </div>
        </div>

        <div
          className="ui teal vertical animated button"
          tabIndex="0"
          onClick={() => this.props.history.push("/store")}>
          <div className="hidden content">Shop</div>
          <div className="visible content">
            <i className="shop icon"></i>
          </div>
        </div>

        <div className="ui teal vertical animated button" tabIndex="0">
          <div className="hidden content">Medicine</div>
          <div className="visible content">
            <i className="syringe icon"></i>
          </div>
        </div>

        <div className="ui teal vertical animated button" tabIndex="0">
          <div className="hidden content">Play</div>
          <div className="visible content">
            <i className="table tennis icon"></i>
          </div>
        </div>
        <Card>
          <label>{this.props.pet.name}</label>
          <label>Age: {this.props.age}</label>
          <lable>Health</lable>
          <Progress percent={this.props.pet.health} color='red'/>
          <label>Hunger</label>
          <Progress percent={this.props.pet.hunger} color='green'/>
          <label>Fun</label>
          <Progress percent={this.props.pet.happiness} color='blue'/>
        </Card>
      </React.Fragment>
    )
  }
}

export default Home