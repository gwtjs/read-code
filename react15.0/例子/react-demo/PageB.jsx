import React from './modules/React'

export default class PageB extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            color: ''
        }
    }
    // componentWillReceiveProps(props) {
    //   this.setState({
    //     color: props.color
    // })
    // }
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
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