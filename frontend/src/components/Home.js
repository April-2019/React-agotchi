import React from 'react'

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
        return(
            <div>
                Hello from Home
                <button onClick={this.handleLogoutClick}>Logout</button>
                <button onClick={() => this.props.history.push("/store")}>Store</button>
                <button onClick={() => this.props.history.push("/graveyard")}>Graveyard</button>
            </div>
        )
    }
}

export default Home