import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import signinService from '../../services/sign-in';
import tokenService from '../../services/token';
import userService from '../../services/users';
import {
  userLogin,
  registerUser,
  getUserDetails
} from '../thunks'

const userToken = tokenService.getToken()

interface UserState {
  loading: boolean
  userInfo: any
  userToken: string | null
  error: any,
  success: boolean,
}

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
} as UserState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem('userToken') // delete token from storage
      tokenService.clearUser()
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
    // login
    .addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    // register
    .addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    //details
    .addCase(getUserDetails.pending, (state) => {
      state.loading = true
    })
    .addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    })
    .addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer