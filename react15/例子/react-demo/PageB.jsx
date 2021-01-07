import React from 'react'

export default class PageB extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            color: props.color
        }
    }
    componentWillReceiveProps(props) {
      this.setState({
        color: props.color
    })
    }
    render () {
        const color = this.state.color
        return <div style={{color}}>
        <h2>pageB</h2>
        <button onClick={()=>{this.setState({color:'red'})}}>红色</button>
        <button onClick={()=>{this.setState({color:'black'})}}>黑色</button>
    </div>
    }
}