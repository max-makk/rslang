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

interface Settings {
  wordsPerDay: number
  optional: {}
}

const getSettings = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/settings`, config())
  return request.data
}

const updateSettings = async (id: string, data: Settings) => {
  const request = await axios.put(`${baseUrl}/users/${id}/settings`, data, config())
  return request.data
}

export default {
  getSettings,
  updateSettings
}