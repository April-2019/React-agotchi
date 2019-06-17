import React from 'react'
import Store from './Store'

class Home extends React.Component {

    componentDidMount() {
        this.props.loggedIn(
            () => {},
            () => this.props.history.push("/")
        );
    }

    handleLogoutClick = () => {
        this.props.logOut(); 
        this.props.history.push("/");
    }

   

  render() {
    document
      .body
      .setAttribute('class', 'home_background')
    return (
        <React.Fragment>
        <div>
          <button onClick={this.handleLogoutClick}>Logout</button>
        </div>
        <div className='stats'></div>
        <div className="ui buttons">
          <div className="ui teal vertical animated button" tabIndex="0">
            <div className="visible content">
              <i className="utensils icon"></i>
            </div>
            <div className="hidden content">
              Feed
            </div>
          </div>
          <div className="ui teal vertical animated button" tabIndex="0" onClick={() => this.props.history.push("/store")}>
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
        </div>
      </React.Fragment>
    )
  }
}

export default Home