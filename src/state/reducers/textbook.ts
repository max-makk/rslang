import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import aggregatedService from '../../services/users-aggregated-word'
import wordsService from '../../services/words'

const initialState = {
  words: [],
  difficult: [],
  page: '0',
  group: '0'
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
  },
})

export const initializeWords = (page: string, group: string) => {
  return async (dispatch: Dispatch) => {
    wordsService.getWords(page, group).then((response) => {
      dispatch(setWords(response))
    })
  }
}

export const initializeAggregatedWords = (group: string, page: string) => {
  return async (dispatch: Dispatch) => {
    aggregatedService.getAggregatedWords(group, page).then((response) => {
      dispatch(setPage(page))
      dispatch(setPage(group))
      dispatch(setWords(response[0].paginatedResults))
    })
  }
}

export const initializeHardWords = () => {
  return async (dispatch: Dispatch) => {
    aggregatedService.getHardWords().then((response) => {
      dispatch(setDifficultWords(response[0].paginatedResults))
    })
  }
}

export const { setGroup, setPage, setWords, setDifficultWords } = textbookSlice.actions
export default textbookSlice.reducer
