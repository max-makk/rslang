import axios from "axios"
import tokenService from './user'

const baseUrl = 'https://learnwords-backend.herokuapp.com'

interface NewUser  {
  name: string
  email: string
  password :string
}

const createUser = async (data: NewUser) => {
  const request = await axios.post(`${baseUrl}/users`, data)
  return request.data
}

const refreshConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${tokenService.getRefreshToken()}`,
    },
  }
}

const getUserTokens = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/tokens`,refreshConfig() )
  return request.data
}

export default {
  createUser,
  getUserTokens
}