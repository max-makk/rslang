import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import userService from '../../services/user'
import wordsService from '../../services/words'

const initialState = {
  useTextbook: false,
  words: [],
  page: '',
  group: '',
  level: ''
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setTextbook(state, action) {
      state.useTextbook = true
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setGroup(state, action) {
      state.group = action.payload
    },
    setLevel(state, { payload }) {
     state.level = payload
   },
  },
})


export const { setGroup, setPage, setLevel } = sprintSlice.actions
export default sprintSlice.reducer