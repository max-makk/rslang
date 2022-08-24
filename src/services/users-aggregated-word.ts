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

const getAggregatedWords = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords`, config())
  return request.data
}

const getAggregatedWord = async (id: string, wordId: string) => { // !!!
  const request = await axios.get(`${baseUrl}/users/${id}/aggregatedWords/${wordId}`, config())
  return request.data
}

export default {
  getAggregatedWords,
  getAggregatedWord
}