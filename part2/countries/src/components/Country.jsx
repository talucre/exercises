import { useEffect, useState } from "react"
import axios from "axios"

const Country = ({country}) => {
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  const baseURL = "https://api.openweathermap.org"

  
  useEffect(() => {
    async function fetchWeather() {
      try {
        console.log("Start loading")
        setLoading(true)
        
        const {lat, lon} = await axios
          .get(`${baseURL}/geo/1.0/direct?q=${country.capital}&limit=1&appid=${api_key}`)
          .then(response => response.data[0])
          .catch(e => {throw new Error(`HTTP Error: ${e}`)})

        const jsonWeather = await axios
          .get(`${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
          .then(response => response.data)
          .catch(e => {throw new Error(`HTTP Error: ${e}`)})
        
        setWeather(jsonWeather)
        setError(null)

        console.log(weather)
      } catch(error) {
        setError(error)
        setWeather(null)
      } finally {
        console.log('completed loading')
        setLoading(false)
      }
    }
    fetchWeather()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
        {Object.values(country.languages).map((lang, index) => 
            <li key={index}>{lang}</li>
        )}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} />
        <h2>Weather in {country.capital[0]}</h2>
        <div>Temperature {(weather.main.temp - 273).toFixed(2) + " Celcius"}
        </div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="loading" />
        <div>Wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Country