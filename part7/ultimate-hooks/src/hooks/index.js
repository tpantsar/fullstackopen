import axios from 'axios'
import { useState } from 'react'

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    axios
      .get(baseUrl)
      .then((response) => {
        setResources(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => {
        setResources(resources.concat(response.data))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const service = {
    getAll,
    create,
  }

  return [resources, service]
}
