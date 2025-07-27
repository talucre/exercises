const Country = ({country}) => {
  if (!country || !country.flags) {
    return <div>Loading...</div>
  }
  
  console.log(country);
  console.log(country.flags.svg)

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
    </div>
  )
}

export default Country