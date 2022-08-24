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

interface Statistic {
  learnedWords: number
  optional: {}
}

const getStatistic = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/statistics`, config())
  return request.data
}

const updateStatistic = async (id: string, data: Statistic) => {
  const request = await axios.put(`${baseUrl}/users/${id}/statistics`, data, config())
  return request.data
}

export default {
  getStatistic,
  updateStatistic
}