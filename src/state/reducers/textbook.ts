import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import aggregatedService from '../../services/users-aggregated-word'
import wordsService from '../../services/words'
import { RootState } from '../store';
import usersWords from '../../services/users-words';

const initialState = {
  words: [],
  difficult: [],
  learned: [],
  page: '0',
  group: '0',
  mode: 'words',
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
    setWords(state, {payload}) {
      state.words = payload
    },
    setDifficultWords(state, {payload}) {
      state.difficult = payload
    },
    setTextbookMode(state, {payload}) {
      state.mode = payload
    },
    setDifficultWord(state, {payload}) {
      state.difficult = state.difficult.map(d => d)
    },
    setLearnedWords(state, {payload}) {
      state.learned = payload
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


export const initializeLearnedWords = () => {
  return async (dispatch: Dispatch) => {
    aggregatedService.getLearnedWords().then((response) => {
      dispatch(setLearnedWords(response))
    })
  }
}
export const setLearnedWord = (wordId: string, data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.createUserWord(wordId, data).then(res => {
      dispatch(setLearnedWords(res))
    })
  }
}


export const setHardWord = (wordId: string, data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.createUserWord(wordId, data).then(res => {
      dispatch(setDifficultWord(res))
    })
  }
}
export const deleteHardWord = (wordId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.deleteUserWord(wordId).then(res => {
    })
  }
}

export const deleteLearnedWord = (wordId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.deleteUserWord(wordId).then(res => {
    })
  }
}
// deleteUserWord

export const updateHardWord = (wordId: string, data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.updateUserWord(wordId, data).then(res => {
      dispatch(setDifficultWord(res))
      console.log(res, 'put')
    })
  }
}


export const {
  setGroup,
  setPage,
  setWords,
  setDifficultWords,
  setTextbookMode,
  setDifficultWord,
  setLearnedWords
} = textbookSlice.actions
export default textbookSlice.reducer
