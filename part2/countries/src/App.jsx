import { useEffect, useState } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'
import Country from './components/Country'

const App = () => {
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"
  
  const [countires, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [matching, setMatching] = useState([])

  useEffect(() => {
    axios
      .get(`${baseURL}/all`)
      .then(response => {
       setCountries(response.data)
       setMatching(response.data)
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error)
      })
  }, [])

  useEffect(() => {
    const match = countires.filter(item => {
      return item.name.common.toLowerCase().includes(filter.toLowerCase())
    })
    setMatching(match)
  }, [filter])

  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <label htmlFor="country">find country</label>&nbsp;
      <input
        type="text"
        name='country'
        value={filter}
        onChange={handleFilterChange}  
      />
      {matching.length === 1 ? 
        <Country country={matching[0]}/> : 
        <CountriesList countries={matching}/>
      }
      
      <div>
        <h1>debug</h1>
        <div>filter: {filter}</div>
        <div>matching: {matching.length}</div>
        <div>countires: {countires.length}</div>
      </div>
    </>
  )
}

export default App
