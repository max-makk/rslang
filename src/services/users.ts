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

interface NewUser  {
  name: string
  email: string
  password :string
}

const createUser = async (data: NewUser) => {
  const request = await axios.post(`${baseUrl}/users`, data)
  return request.data
}

const getUser = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}`, config())
  return request.data
}

const updateUser = async (id: string, data: NewUser) => {
  const request = await axios.put(`${baseUrl}/users/${id}`,data ,config() )
  return request.data
}

const deleteUser = async (id: string) => {
  const request = await axios.delete(`${baseUrl}/users/${id}`,config() )
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
  getUser,
  updateUser,
  deleteUser,
  getUserTokens
}