import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        .then((response) => {
          console.log('response', response)
          setCountry({ data: response.data, found: true })
        })
        .catch(() => {
          setCountry({ found: false })
        })
    }
  }, [countryName])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
