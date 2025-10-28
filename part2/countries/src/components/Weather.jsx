import axios from 'axios'
import { useEffect, useState } from 'react'

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseURL = 'https://api.openweathermap.org'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            const [lat, lon] = country.capitalInfo.latlng
            const response = await axios.get(
                `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
            )
            setWeather(response.data)
        }

        fetchWeather()
    }, [])

    if (!weather) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <h2>Weather in {country.name.common}</h2>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img
                src={`https://openweathermap.org/img/wn//${weather.weather[0].icon}@2x.png`}
                alt=""
            />
            <div>Wind {weather.wind.speed} m/s</div>
        </>
    )
}

export default Weather
