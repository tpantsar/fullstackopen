import apiClient from './apiClient'
const resourceUrl = '/login'

const login = async (credentials) => {
  const response = await apiClient.post(resourceUrl, credentials)
  return response.data
}

export default { login }
