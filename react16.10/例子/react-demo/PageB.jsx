import React, { useState } from 'react'

function PageB () {
    const [color, setColor] = useState('')
    return <div style={{color}}>
    <h2>pageB</h2>
    <button onClick={()=>{setColor({color:'red'})}}>红色</button>
    <button onClick={()=>{setColor({color:'black'})}}>黑色</button>
</div>
}
export default PageB