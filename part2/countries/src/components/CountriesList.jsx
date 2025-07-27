const Countries = ({countries, setMatching}) => {
  
  if (!countries.length) {
    return null
  }

  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  


  return (
    <div>
      {countries.map((country, index) => 
        <div key={index}>
          {country.name.common}
          <button onClick={() => setMatching([country])}>show</button>
        </div>
      )}
      </div>
  )
}

export default Countries