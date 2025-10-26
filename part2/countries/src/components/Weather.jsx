import axios from 'axios'
import { useEffect, useState } from 'react'

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseURL = 'https://api.openweathermap.org'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const [lat, lon] = country.capitalInfo.latlng
        const url = `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        axios.get(url).then(response => setWeather(response.data))
    })

    if (!weather) {
        return null
    }

    const weatherIcon = weather.weather[0].weatherIcon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

    return (
        <>
            <h2>Weather in {country.capital}</h2>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img
                src={weatherIconUrl}
                alt={`Weather icon of ${weather.weather[0].description}`}
            />
            <div>Wind {weather.wind.speed} m/s</div>
        </>
    )
}

export default Weather
