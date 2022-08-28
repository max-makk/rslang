import axios from "axios"

const baseUrl = 'http://localhost:3001'

const getWords = (group: string, page: string) => {
  const request = axios.get(`${baseUrl}/words?group=${group}&page=${page}`)
  return request.then((response) => response.data)
}

const getWord = (id: string) => {
  const request = axios.get(`${baseUrl}/words/${id}`)
  return request.then((response) => response.data)
}

export default { getWord, getWords }