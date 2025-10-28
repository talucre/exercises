import axios from 'axios'
import { useEffect, useState } from 'react'
import CountriesList from './components/CountriesList'

const COUNTRY_API_URL = 'https://studies.cs.helsinki.fi/restcountries/'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get(`${COUNTRY_API_URL}/api/all`)
            setCountries(response.data)
        }

        fetchCountries()
    }, [])

    const matchedCountries = countries.filter(c =>
        c.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

    console.log(matchedCountries)

    return (
        <>
            <label>
                find countries{' '}
                <input
                    type="text"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
            </label>
            <CountriesList
                countries={matchedCountries}
                showCountry={setSearch}
            />
        </>
    )
}

export default App
