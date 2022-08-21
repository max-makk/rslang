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

interface Word {
  difficulty: string
  optional: {}
}

const getAllUserWords = async (id: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/words`)
  return request.data
}

const createUserWord   = async (id: string, wordId: string, data: Word) => {
  const request = await axios.post(`${baseUrl}/users/${id}/words/${wordId}`, data, config())
  return request.data
}

const getUserWord = async (id: string, wordId: string) => {
  const request = await axios.get(`${baseUrl}/users/${id}/words/${wordId}`, config())
  return request.data
}

const updateUserWord = async (id: string, wordId: string, data: Word) => {
  const request = await axios.put(`${baseUrl}/users/${id}/words/${wordId}`, data, config())
  return request.data
}

const deleteUserWord = async (id: string, wordId: string) => {
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