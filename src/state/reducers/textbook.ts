import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from 'redux'
import aggregatedService from '../../services/users-aggregated-word'
import wordsService from '../../services/words'
import {RootState} from "../store";
import usersWords from "../../services/users-words";

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
      // @ts-ignore
      state.difficult = state.difficult.map((x: any) => {
        if (x._id === payload.wordId) {
          console.log(x)
          console.log('x')
        }
      })
    }
    // setLearnedWords(state, { payload }) {
    //   state.learned = payload
    // },
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

export const setHardWord = (wordId: string, data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.createUserWord(wordId, data).then(res => {
      dispatch(setDifficultWord(res))
      console.log(res, 'put')
    })
  }
}

export const updateHardWord = (wordId: string, data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    await usersWords.updateUserWord(wordId, data).then(res => {
      dispatch(setDifficultWord(res))
      console.log(res, 'put')
    })
  }
}
// export const setHardWord = (wordId: string, data: any) => {
// return async (dispath: Dispatch, getState: () => RootState) => {
//   await usersWords.updateUserWord(wordId, data).then(res => {
//     console.log(res, 'put')
//   })
//       .catch(err => {
//     usersWords.createUserWord(wordId, data).then(res => {
//       console.log(res, 'create')
//     })
//   })
// }
// }


export const {setGroup, setPage, setWords, setDifficultWords, setTextbookMode, setDifficultWord} = textbookSlice.actions
export default textbookSlice.reducer
