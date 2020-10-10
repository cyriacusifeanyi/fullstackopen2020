import Axios from 'axios';
import React, { useEffect, useState } from 'react';


const Weather = ({ city }) => {

    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    let params = {
        access_key: api_key,
        query: city
    }

    const hook = () => {
        Axios
            .get('http://api.weatherstack.com/current', { params })
            .then(response => {
                setWeather(response.data)
            })
    }
    useEffect(hook, [])
    
    return (

        <div>

            {console.log('hello', weather)}

            <h2>Weather in {weather.map((weather) => weather.location.name)}</h2>
            <strong>temperature:</strong> {weather.current.temperature}℃ <br />
            <img
                src={weather.current.weather_icons}
                alt={''.concat(weather.current.weather_descriptions, " in ", weather.location.name)}
            //  length="100px" width="100px" 
            /> <br />
            <strong>wind:</strong> {weather.current.wind_speed} mph &nbsp;
            <strong>direction:</strong> {weather.current.wind_dir}


        </div>

    )
}

export default Weather



