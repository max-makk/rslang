import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import { createSprintDeck, getRandomGroupNumber, getRandomPageNumber } from "../../utils/utils";
import userService from '../../services/user'

import wordsService from '../../services/words'
import { RootState, store } from "../store";

const initialState = {
  isGameStarted: false,
  useTextbook: false,
  idx: 0,
  words: [],
  answers: [],
  deck: [],
  page: '',
  group: '',
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    increaseIdx(state, action) {
      state.idx += 1
    },
    startGame (state, {payload}) {
      state.isGameStarted = payload
    },
    setGuestWords(state, {payload}) {
      state.words = payload
    },
    initWords(state, {payload}) {
      state.words = payload
    },
    setTextbook(state, {payload}) {
      state.useTextbook = payload
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setGroup(state, action) {
      state.group = action.payload
    },
    setDeck(state, {payload}) {
      state.deck = payload
    }
  },
})

export const initWordsLevel = (group: string, page: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    wordsService.getWords(group, page).then(response => {
      dispatch(initWords(response))
      const deck = createSprintDeck(response)
      dispatch(setDeck(deck))
    })
  }
}

export const {
  setGroup,
  setPage, 
  initWords, 
  startGame, 
  setDeck, 
  increaseIdx,
  setGuestWords
} = sprintSlice.actions
export default sprintSlice.reducer