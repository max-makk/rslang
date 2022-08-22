import axios from "axios"

const baseUrl = 'http://localhost:3001'

const getWords = (page: string, group: string) => {
  const request = axios.get(`${baseUrl}/words?page=${page}&group=${group}`)
  return request.then((response) => response.data)
}

const getWord = (id: string) => {
  const request = axios.get(`${baseUrl}/words/${id}`)
  return request.then((response) => response.data)
}

const getAllWords = () => {
  const request = axios.get(`${baseUrl}/words`)
  return request.then((response) => response.data)
}

export default { getAllWords, getWord, getWords }