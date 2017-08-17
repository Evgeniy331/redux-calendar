import React, { Component } from "react"

class App extends Component {
    render() {
        return (
            <div id="application">{this.props.children}</div>
        )
    }
}

export default App;