import React from 'react'

class Home extends React.Component {

    componentDidMount() {
        this.props.loggedIn(
            () => {},
            () => this.props.history.push("/")
        );
    }

    render() {
        return(
            <div>
                Hello from Home
            </div>
        )
    }
}

export default Home