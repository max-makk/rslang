import axios from "axios"
import tokenService from './token'

const baseUrl = 'http://localhost:3001'

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  }
}

const getHardWords = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}`, config())
  return request.data
}

const getEasyWords = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"easy"}`, config())
  return request.data
}

const getLearndedWords = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords?wordsPerPage=3600&filter={"userWord.optional.learned":true}`, config())
  return request.data
}

// const getAggregatedWord = async (id: string, wordId: string) => { // !!!
//   const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords/${wordId}`, config())
//   return request.data
// }

export default {
  getHardWords,
  getEasyWords,
  getLearndedWords
}