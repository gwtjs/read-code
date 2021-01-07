import React from 'react'

export default class PageA extends React.Component{
    render () {
        const {color,setColor} = this.props
        return <div style={{color}}>
        <h2>pageA</h2>
        <button onClick={()=>{setColor('red')}}>红色</button>
        <button onClick={()=>{setColor('black')}}>黑色</button>
    </div>
    }
}