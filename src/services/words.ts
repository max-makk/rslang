import axios from "axios"

const baseUrl = 'http://localhost:3001'

const getAllWords = () => {
  const request = axios.get(`${baseUrl}/words`)
  return request.then((response) => response.data)
}

const getOneWord = (id: string) => {
  const request = axios.get(`${baseUrl}/words/${id}`)
  return request.then((response) => response.data)
}

export default { getAllWords, getOneWord }