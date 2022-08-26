let token: null | string = null
let refreshToken: null | string = null

const STORAGE_KEY = 'loggedRslangAppUser'

interface User {
  message: string
  refreshToken: string
  token: string
  userId: string
}

const setUser = (user: User) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  token = user.token
  refreshToken = user.refreshToken
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getUserId = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const id  = user.userId
    return id
  }
  return null
}
const getToken = () => token
const getRefreshToken = () => refreshToken

export default {
  setUser,
  getUser,
  clearUser,
  getToken,
  getRefreshToken,
  getUserId
}