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

interface Word {
  difficulty: string
  optional: {}
}

const getAllUserWords = async () => {
  const id = tokenService.getUserId()
  const request = await axios.get(`${baseUrl}/users/${id}/words`)
  return request.data
}

const createUserWord   = async (wordId: string, data: Word) => {
  const id = tokenService.getUserId()
  const request = await axios.post(`${baseUrl}/users/${id}/words/${wordId}`, data, config())
  return request.data
}

const getUserWord = async (wordId: string) => {
  const id = tokenService.getUserId()
  const request = await axios.get(`${baseUrl}/users/${id}/words/${wordId}`, config())
  return request.data
}

const updateUserWord = async (wordId: string, data: Word) => {
  const id = tokenService.getUserId()
  const request = await axios.put(`${baseUrl}/users/${id}/words/${wordId}`, data, config())
  return request.data
}

const deleteUserWord = async (wordId: string) => {
  const id = tokenService.getUserId()
  const request = await axios.delete(`${baseUrl}/users/${id}/words/${wordId}`, config() )
  return request.data
}

export default {
  getAllUserWords,
  createUserWord,
  getUserWord,
  updateUserWord,
  deleteUserWord
}