import Weather from './Weather'

const Country = ({ country }) => {
    const languages = Object.values(country.languages)

    return (
        <>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital[0]}</div>
            <div>Area {country.area}</div>

            <h2>Languages</h2>
            <ul>
                {languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>

            <img witdh="200" src={country.flags.png} alt={country.flags.alt} />

            <Weather country={country} />
        </>
    )
}

const CountriesList = ({ countries, showCountry }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    if (countries.length > 1) {
        return countries.map(c => (
            <div key={c.cca3}>
                {console.log(c)}
                {c.name.common}
                <button onClick={() => showCountry(c.name.common)}>Show</button>
            </div>
        ))
    }

    return <div>No matches, please try another search</div>
}

export default CountriesList
