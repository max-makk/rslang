import axios from 'axios'
import tokenService from './user'

const baseUrl = 'https://learnwords-backend.herokuapp.com'

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  }
}

const getAggregatedWords = (group: string, page: string) => {
  const id = tokenService.getUserId()
  const request = axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=20&group=${group}&page=${page}`, config())
  return request.then((response) => response.data[0].paginatedResults)
}

const getHardWords = async () => {
  const id = tokenService.getUserId()
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}`, config())
  return request.data
}

const getEasyWords = async () => {
  const id = tokenService.getUserId()
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"easy"}`, config())
  return request.data
}

const getLearnedWords = async () => {
  const id = tokenService.getUserId()
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600&filter={"userWord.optional.learned":true}`, config())
  return request.data[0].paginatedResults
}

const getAllAggregatedWords = () => {
  const id = tokenService.getUserId()
  const request = axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600`, config())
  return request.then((response) => response.data)
}

// const getAggregatedWord = async (id: string, wordId: string) => { // !!!
//   const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords/${wordId}`, config())
//   return request.data
// }

export default {
  getAggregatedWords,
  getHardWords,
  getEasyWords,
  getLearnedWords
}
