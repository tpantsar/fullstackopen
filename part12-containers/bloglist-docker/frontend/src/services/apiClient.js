import axios from 'axios'

const { VITE_BACKEND_URL } = import.meta.env

// Use the baseURL '/api' from the .env file
// If the .env file does not exist, use the default URL for local development
const apiClient = axios.create({
  baseURL: VITE_BACKEND_URL || 'http://localhost:3001/api',
})

console.log('VITE_BACKEND_URL:', VITE_BACKEND_URL)
console.log('apiClient.baseURL:', apiClient.defaults.baseURL)

export default apiClient
