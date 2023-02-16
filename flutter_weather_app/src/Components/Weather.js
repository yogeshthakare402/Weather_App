import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Weather.css';
import { TiWeatherCloudy, TiWeatherSunny, TiWeatherSnow, TiWeatherDownpour, TiWeatherPartlySunny,TiStarOutline,TiStar } from 'react-icons/ti';

function Weather() {
    const [weatherCondition, setWeatherCondition] = useState([]);
    const location = useLocation();
    let currLocation = location.state.loc;
    let favouriteLoc = location.state.favourite
    const [favourite, setfavourite] = useState(favouriteLoc)
    const [searchCity, setSearchCity] = useState(currLocation)

    let navigate = useNavigate();

    const fetchedData = async () => {
        // const url = "https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=f77d781f17526ec5546c838ff8eb715a"
        const url = window.location.origin + '/mockData.json'
        const response = await fetch(url, { mode: 'cors' });
        const data = await response.json();
        // console.log(data.list)
        setWeatherCondition(data.list)
    }

    useEffect(() => {
        fetchedData()
    }, [])

    const currLocationWeather = () => {
        let currData ;
        if(searchCity.length>0){
             currData = weatherCondition.filter((data) => {
                return data.city === searchCity ? data : ''
            })
        }else {
            setSearchCity(currLocation)
            currData = weatherCondition.filter((data) => {
                return data.city === searchCity ? data : ''
            })
        }
        
        return currData
    }

    const selectweatherIcon = () => {
        let icon = ''
        let sky = currLocationWeather()[0].weather[0].description;
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

    const addToFav = (dataCity)=>{
        let added = favourite.some(city=>{return dataCity===city})
        if(added){
           let removeCity= favourite.filter(addedCity=>dataCity!==addedCity)
           setfavourite(removeCity)
        }else{
            setfavourite([...favourite,dataCity])
        }
        
    }

    const startIcon = (dataCity)=>{
        let star = favourite.some(city=>{return dataCity===city})
        if(star){
            return <TiStar onClick={()=>addToFav(dataCity)}/>
        }else{
            return <TiStarOutline onClick={()=>addToFav(dataCity)}/>
        }
    }

    return (
        <div className='container'>
            <div className='search'>
                <div>
                    <input type="text" name="search" id="search" onChange={(e) => setSearchCity(e.target.value)} placeholder=' Search city...' />
                </div>

            </div>
            <div id='currentLocation'>
                {currLocationWeather().map((data, i) => {
                    return <div key={i} id='card'>
                        <div id='currlocCard'>
                            <div className='cardEle'>
                                <div className='cardHead'>
                                    <h2>Current Weather</h2>
                                    <div>{data.dt_txt.split(" ")[1]}</div>
                                </div>

                                <div className='tempCard'>
                                    <div>{selectweatherIcon()}</div>
                                    <div className='temp'>{data.main.temp} &deg;F</div>
                                </div>
                            </div>
                            <div className='cardEleTwo'>
                                <div className='cardEleTwo_in'>
                                    <div className='cardHead'>
                                        <h2>{data.city} {startIcon(data.city)}
                                        </h2>
                                        <div>{data.dt_txt.split(" ")[0]}</div>
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

            <div className='favourite'>
                <label htmlFor="favourite">Favourite Locations</label>
                <select name="favourite" id="favourite" onChange={(e)=>{
                            // console.log(e.target.value);
                            setSearchCity(e.target.value)
                            currLocationWeather()
                        }}>
                            <option value="select">Select city</option>
                    {favourite && favourite.map((city,i) => {
                        return <option value={city} key={i}>{city}</option>
                    })}
                </select>
                <button id='favbtn' onClick={()=>{
                    navigate('/favourite',{state:{weatherCondition:weatherCondition,favourite:favourite, currLocation:currLocation}})
                }}>Go to Favourite</button>
            </div>
        </div>
    )
}

export default Weather