import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import signinService from '../services/sign-in';
import tokenService from '../services/token';
import userService from '../services/users';
import userWordsService from '../services/users-words';
import wordsService from '../services/words';

// register

interface UserRegister {
  name: string
  email: string
  password: string
}

type UserLogin = Omit<UserRegister, 'name'>

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: UserLogin, { rejectWithValue }) => {
    try {
      const data = await signinService.signIn({ email, password})
      tokenService.setUser(data)
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue('Error Login')
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: UserRegister, { rejectWithValue }) => {
    try {
      userService.createUser({ name, email ,password })
    } catch (error) {
      console.log(error)
      return rejectWithValue('Error Register')
    }
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user }: any = getState()
      console.log(user)
      const data = await userService.getUser(user.id)
      return data
    } catch (error: any) {
      return rejectWithValue('Error User')
    }
  }
)

// words

export const getWords = createAsyncThunk(
  'words/get-words',
 async ({group, page}: {group: string ,page: string}, { rejectWithValue }) => {
  try {
    const words = await wordsService.getWords(page, group)
    return words
  } catch (error) {
      return rejectWithValue('Error Get Words')
  }
 }
)

export const getWord = createAsyncThunk(
  'words/get-word',
 async (id: string, { rejectWithValue }) => {
  try {
    const word = await wordsService.getWord(id)
    return word
  } catch (error) {
    return rejectWithValue('Error Get Word')
  }
 }
)

// user Words

export const getUserWords = createAsyncThunk(
  'words/get-user-words',
 async (id: string, { rejectWithValue }) => {
  try {
    const words = await userWordsService.getAllUserWords(id)
    return words
  } catch (error) {
    return rejectWithValue('Eror Get User Words')
  }
 }
)