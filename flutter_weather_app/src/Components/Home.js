import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Weather.css';

// navigate("/weather")

function Home() {
    const [currentLoc, setCurrentLoc] = useState('')
    let navigate = useNavigate();
    const wetherPage = () => {
        navigate("/weather", {state:{loc:currentLoc.toLowerCase()}})
    }
    return (
        <div id='home'>
            <div className='header'>
                <h2>Weather Forcast</h2>
            </div>

            <div className="instructions">
                <p>Enter a your current Location.</p>
            </div>

            <div className='areaInput'>
                    <input type='text' placeholder='Enter Area name..' name='area' onChange={(e)=>setCurrentLoc(e.target.value)}/>
                    <button onClick={()=>wetherPage()}>ENTER</button>
            </div>
        </div>
    )
}

export default Home