import React, { useState } from 'react'

function PageA (props) {
    const {color,setColor}=props
    return <div style={{color}}>
        <h2>pageA</h2>
        <button onClick={()=>{setColor('red')}}>红色</button>
        <button onClick={()=>{setColor('black')}}>黑色</button>
    </div>
}

export default PageA