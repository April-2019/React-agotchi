import React from 'react'
import constants from '../constants'
import {Card, Statistic} from 'semantic-ui-react'
// import {Form, Container, Col, Button, Row} from 'react-bootstrap'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Register from './Register'


export default class Store extends React.Component {

  state = {
    username:""
  }

  componentDidMount() {
    this.props.loggedIn(
        (username) => {this.setState({username:username})},
        () => this.props.history.push("/")
    );
  }

  componentWillUnmount() {

  }


  backHome = () => {
    this.props.updateMoney(this.state.username, this.props.user.money)
    .then( () => {
      // this.setState({
      //   username:""
      // })
      this.props.history.push('/home')
    })
  }

  render() {
    
    document.body.setAttribute('class', 'store_background')
    return (
    <React.Fragment>
      <div className="ui primary top attached button" tabIndex="0" onClick={() => this.backHome()}>Back Home</div>
      <button className="positive ui button" onClick={() => this.props.buyApple(this.state.username)}>Buy Food</button>
      <button className="positive ui button" onClick={() => this.props.buyToy(this.state.username)}>Buy Toy</button>
      <button className="positive ui button" onClick={() => this.props.buyMedicine(this.state.username)}>Buy Medicine</button>
      <Statistic>
        <Statistic.Value>{this.props.user.money}</Statistic.Value>
        <Statistic.Label>Coin(s)</Statistic.Label>
      </Statistic>
      <Card>
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
        <Statistic.Label>Toy(s)</Statistic.Label>
      </Statistic>
    </Statistic.Group>
    </Card>
    </React.Fragment>
    )
  }
}
