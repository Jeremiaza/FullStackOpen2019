import axios from 'axios';
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, newObject, config)
  return response.data

}

const deleteById = id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const addComment = (id, newComment) => {
  const request = axios.put(`${baseUrl}/${id}/comments`, newComment)
  return request.then(response => response.data)
}

export default { getAll, create, deleteById, update, addComment, setToken }