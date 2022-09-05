import axios from "axios"

const baseUrl = 'https://learnwords-backend.herokuapp.com'

interface NewUser  {
  email: string
  password :string
}

const login = async (user: NewUser) => {
  const request = await axios.post(`${baseUrl}/signin`, user)
  return request.data
}

export default {
  login
}