import axios from "axios"
import tokenService from './user'

const baseUrl = 'https://learnwords-backend.herokuapp.com'

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

const getSettings = async () => {
  const id = tokenService.getUserId()
  const request = await axios.get(`${baseUrl}/users/${id}/settings`, config())
  return request.data
}

const updateSettings = async (data: Settings) => {
  const id = tokenService.getUserId()
  const request = await axios.put(`${baseUrl}/users/${id}/settings`, data, config())
  return request.data
}

export default {
  getSettings,
  updateSettings
}