import React, { useState } from './modules/React'
import {hot} from "react-hot-loader";
import PageA from './PageA'
import PageB from './PageB'

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            color: 'red'
        }
        this.setColor = this.setColor.bind(this)
    }
    setColor(color) {
        this.setState({color})
    }
    render() {
        const color = this.state.color
        return <div>
        <span style={{color}}>app</span>
        <PageA color={color} setColor={this.setColor}/>
        <PageB color={color}/>
    </div>
    }
}

export default App