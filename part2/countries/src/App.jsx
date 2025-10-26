import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryList from './components/CountriesList'

const COUNTRY_API_URL = 'https://studies.cs.helsinki.fi/restcountries/'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get(`${COUNTRY_API_URL}/api/all`).then(response => {
            setCountries(response.data)
        })
    })

    const matchedCountries = countries.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <div>
                find countries{' '}
                <input
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
            </div>
            {search === '' ? null : (
                <CountryList
                    countries={matchedCountries}
                    showCountry={setSearch}
                />
            )}
        </>
    )
}

export default App
