import React from 'react'

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
      </React.Fragment>
    )
  }
}

export default Home