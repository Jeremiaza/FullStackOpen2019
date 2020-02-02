import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request;
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
const deleteObject = (id, Obj) => {
  return axios.delete(`${baseUrl}/${id}`, Obj)
}
export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deleteObject
}