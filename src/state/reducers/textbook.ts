import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import aggregatedService from '../../services/users-aggregated-word'
import wordsService from '../../services/words'
import userService from '../../services/user'

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
    setDifficultWords(state, { payload }) {
     state.difficult = payload
   },
    setLearnedWords(state, { payload }) {
     state.learned = payload
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

export const initializeHardWords = () => {
  return async (dispatch: Dispatch) => {
    const id = userService.getUserId()
    aggregatedService.getHardWords(id).then((response) => {
      dispatch(setDifficultWords(response))
    })
  }
}

export const initializeLearnedWords = () => {
  return async (dispatch: Dispatch) => {
    const id = userService.getUserId()
    aggregatedService.getLearndedWords(id).then((response) => {
      dispatch(setLearnedWords(response))
    })
  }
}

export const { setGroup, setPage, setWords, setDifficultWords, setLearnedWords } = textbookSlice.actions
export default textbookSlice.reducer