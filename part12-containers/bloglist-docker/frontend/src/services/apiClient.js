import axios from 'axios'

// Used in local development
const localBaseURL = 'http://localhost:3001/api'

// Used in production
// VITE_BACKEND_URL='http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || localBaseURL,
})

console.log('apiClient.baseURL:', apiClient.defaults.baseURL)

export default apiClient
