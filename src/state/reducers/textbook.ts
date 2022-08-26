import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import wordsService from '../../services/words'

const initialState = {
  words: [],
  learned: [],
  difficult: [],
  page: '',
  group: ''
}

const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setGroup(state, action) {
      state.group = action.payload
    },
    setWords(state, { payload }) {
     state.words = payload
   },
  },
})

export const initializeWords = (page: string, group: string) => {
  return async (dispatch: Dispatch) => {
    wordsService.getWords(page, group).then((response) => {
      dispatch(setPage(page))
      dispatch(setPage(group))
      dispatch(setWords(response))
    })
  }
}

export const { setGroup, setPage, setWords } = textbookSlice.actions
export default textbookSlice.reducer