import React, { useState } from 'react'
import { useCountry, useField } from './hooks'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  console.log('country', country)
  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common} </h3>
      <div>Capital: {capital} </div>
      <div>Population: {population}</div>
      <img src={flags.png} height="150" alt={`flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const countryNameInput = useField('text')

  const [countryName, setCountryName] = useState('')
  const country = useCountry(countryName)

  const fetch = (e) => {
    e.preventDefault()
    setCountryName(countryNameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...countryNameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
