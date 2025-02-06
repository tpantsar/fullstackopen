import apiClient from './apiClient'
const resourceUrl = '/users'

const getAll = () => {
  const request = apiClient.get(resourceUrl)
  return request.then((response) => response.data)
}

export default { getAll }
