import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Weather.css';
import { TiWeatherCloudy, TiWeatherSunny, TiWeatherSnow, TiWeatherDownpour, TiWeatherPartlySunny} from 'react-icons/ti';


function Favourite() {
    const [fav, seFav] = useState([])
    let navigate = useNavigate()
    const location = useLocation();
    let favouriteLoc = location.state.favourite;
    let weatherCondition = location.state.weatherCondition;
    let currentLoc = location.state.currLocation
    // console.log(favouriteLoc)
    // console.log(weatherCondition)

    const currLocationWeather = () => {
        let currData = []
        favouriteLoc.forEach(element => {
            let data = weatherCondition.filter((data) => {
                return data.city === element ? data : ''
            })
            currData.push(data)
        });
        seFav(currData.flat(2))
        console.log("fav")
        console.log(currData.flat(2))
    }
    useEffect(()=>{
        currLocationWeather()
    },[])

    const selectweatherIcon = () => {
        let icon = ''
        // let sky = currLocationWeather()[0].weather[0].description;
        let sky = "clear sky"
        // console.log(sky)
        if (sky === "clear sky") {
            icon = <TiWeatherSunny className='icon' />
        } else if (sky === "light snow") {
            icon = <TiWeatherSnow className='icon' />
        } else if (sky === "few clouds") {
            icon = <TiWeatherCloudy className='icon' />
        } else if (sky === "scattered clouds") {
            icon = <TiWeatherPartlySunny className='icon' />
        } else if (sky === "broken clouds") {
            icon = <TiWeatherDownpour className='icon' />
        }
        return icon
    }

    
  return (
    <div>
        <button id='btn' onClick={()=>navigate("/weather",{state:{loc:currentLoc.toLowerCase(), favourite:favouriteLoc}})}>Go Back</button>
        <div id='currLocation'>
                {fav && fav.map((data, i) => {
                    return <div key={i} id='card'>
                        <div id='currlocCard'>
                            <div className='cardEle'>
                                <div className='cardHead'>
                                    <h2>Current Weather</h2>
                                    <div>{data.dt_txt}</div>
                                </div>

                                <div className='tempCard'>
                                    <div>{selectweatherIcon()}</div>
                                    <div className='temp'>{data.main.temp} &deg;F</div>
                                </div>
                            </div>
                            <div className='cardEleTwo'>
                                <div className='cardEleTwo_in'>
                                    <div className='cardHead'>
                                        <h2>{data.city}
                                        </h2>
                                        <div>{data.dt_txt}</div>
                                    </div>
                                    <div><span>Humidity:</span> {data.main.humidity} %</div>
                                    <div><span>Pressure:</span> {data.main.pressure} mbar</div>
                                    <div><span>Wind:</span>{data.wind.speed} km/h</div>
                                </div>

                            </div>
                        </div>

                        <div id='windcard'>
                            <div>{data.weather[0].description}</div>
                            <div><span>Max Temp:</span>{data.main.temp_max}&deg;F</div>
                            <div><span>Min Temp:</span>{data.main.temp_min}&deg;F</div>
                        </div>
                    </div>
                })}

            </div>
        
    </div>
  )
}

export default Favourite