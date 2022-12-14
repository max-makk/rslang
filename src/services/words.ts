import axios from "axios"

const baseUrl = 'https://learnwords-backend.herokuapp.com'

const getWords = (group: string | number, page: string | number) => {
  const request = axios.get(`${baseUrl}/words?group=${group}&page=${page}`)
  return request.then((response) => response.data)
}

const getWord = (id: string) => {
  const request = axios.get(`${baseUrl}/words/${id}`)
  return request.then((response) => response.data)
}

export default { getWord, getWords }
