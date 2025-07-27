const Countries = ({countries}) => {
  
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
        <div key={index}>{country.name.common}</div>
      )}
      </div>
  )
}

export default Countries