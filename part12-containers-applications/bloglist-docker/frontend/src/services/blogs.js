import apiClient from './apiClient'
const resourceUrl = '/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = apiClient.get(resourceUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await apiClient.post(resourceUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await apiClient.put(`${resourceUrl}/${id}`, newObject)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = apiClient.delete(`${resourceUrl}/${id}`, config)
  return request.then((response) => response.data)
}

const commentBlog = async (id, comment) => {
  const response = await apiClient.post(`${resourceUrl}/${id}/comments`, {
    comment,
  })
  return response.data
}

export default { getAll, create, update, remove, commentBlog, setToken }
