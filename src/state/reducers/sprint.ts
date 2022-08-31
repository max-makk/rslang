import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import { createSprintDeck, getRandomGroupNumber, getRandomPageNumber } from "../../utils/utils";
import userService from '../../services/user'

import wordsService from '../../services/words'
import { RootState, store } from "../store";
import { getExtraWords, getExtraAggregatedWords } from "../../pages/Sprint/utils";

interface State {
  isGameStarted: boolean,
  useTextbook: boolean,
  idx: number,
  words: [],
  guessed: String[],
  unguessed: String[],
  deck: [],
  page: string | undefined,
  group: string | undefined,
}

const initialState: State = {
  isGameStarted: false,
  useTextbook: false,
  idx: 0,
  words: [],
  guessed: [],
  unguessed: [],
  deck: [],
  page: undefined,
  group: undefined,
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
      state.idx = 0
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
    },
    addGuessed(state, {payload}) {
      state.guessed.push(payload)
    },
    addUnGuessed(state, {payload}) {
      state.unguessed.push(payload)
    },
  },
})

export const setGame = (group?: string, page?: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    getExtraWords(group, page).then(res => {
      dispatch(initWords(res))
      const deck = createSprintDeck(res)
      dispatch(setDeck(deck))
      dispatch(startGame(true))
    })
  }
}

export const setUserGame = (group?: string, page?: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    getExtraAggregatedWords(group, page).then(res => {
      dispatch(initWords(res))
      const deck = createSprintDeck(res)
      dispatch(setDeck(deck))
      dispatch(startGame(true))
    })
  }
}

export const {
  addGuessed,
  addUnGuessed,
  setGroup,
  setPage, 
  initWords, 
  startGame, 
  setDeck, 
  increaseIdx,
} = sprintSlice.actions
export default sprintSlice.reducer