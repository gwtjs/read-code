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
        console.log(this.state.color)
        setTimeout(()=>{
            this.setState({color:'green'})
            console.log(this.state.color);
            this.setState({color:'gray'})
            console.log(this.state.color);
        })
    }
    componentDidMount(){
        this.setState({color:'orange'})
        console.log('componentDidMount',this.state.color);
        setTimeout(()=>{
            this.setState({color:'#00ff00'})
            console.log('componentDidMount',this.state.color);
        })

    }
    render() {
        const color = this.state.color
        return <div>
        <span style={{color}}>app</span>
        <PageA color={color} setColor={this.setColor}/>
        <PageB/>
    </div>
    }
}

export default App