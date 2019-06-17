import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

class Home extends React.Component {

  componentDidMount() {
    this
      .props
      .loggedIn(() => {}, () => this.props.history.push("/"));
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
    <Button.Group color='teal'>
      <Button>Save</Button>
      <Dropdown
      className='button icon'
      floating
      options={options}
      trigger={<React.Fragment />}/>
      </Button.Group>

        {// <div>
        //   className="ui teal vertical animated button"
        //   tabIndex="0"
        //   onClick={() => this.props.history.push("/store")}>
        //   <div className="hidden content">Shop</div>
        //   <div className="visible content">
        //     <i className="shop icon"></i>
        //   </div>
        // </div>

        // <div className="ui teal vertical animated button" tabIndex="0">
        //   <div className="hidden content">Health</div>
        //   <div className="visible content">
        //     <i className="syringe icon"></i>
        //   </div>
        // </div>

        // <div className="ui teal vertical animated button" tabIndex="0">
        //   <div className="hidden content">Play</div>
        //   <div className="visible content">
        //     <i className="table tennis icon"></i>
        //   </div>
        // </div>}
        }
      
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