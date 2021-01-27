import React, { useEffect, useState } from 'react'
import {hot} from "react-hot-loader";
import PageA from './PageA'
import PageB from './PageB'

function App() {
    const [color, setColor] = useState('red')
    useEffect(()=>{
        setColor('orange')
        setTimeout(()=>{
            setColor('#00ff00')
        })
    },[])
    return <div>
    <span style={{color}}>app</span>
    <PageA color={color} setColor={setColor}/>
    <PageB/>
</div>
}

export default App