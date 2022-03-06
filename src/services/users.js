import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, get, create, update }