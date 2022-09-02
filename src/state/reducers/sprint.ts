import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import { createSprintDeck, getRandomGroupNumber, getRandomPageNumber } from "../../utils/utils";
import userService from '../../services/user'

import wordsService from '../../services/words'
import { RootState, store } from "../store";
import { getExtraWords, getExtraAggregatedWords } from "../../pages/Sprint/utils";
import usersWords from "../../services/users-words";

interface State {
  isGameStarted: boolean,
  useTextbook: boolean,
  showResults: boolean,
  idx: number,
  words: [],
  guessed: any,
  unguessed: any,
  deck: [],
  page: string | undefined,
  group: string | undefined,
  results: any
}

const initialState: State = {
  isGameStarted: false,
  useTextbook: true,
  showResults: false,
  idx: 0,
  words: [],
  guessed: [],
  unguessed: [],
  deck: [],
  page: undefined,
  group: undefined,
  results: []
}

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    increaseIdx(state, action) {
      state.idx += 1
    },
    startGame (state, {payload}) {
      state.guessed = []
      state.unguessed = []
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
    displayResults(state, {payload}) {
      state.showResults = payload
    },
    setResults(state, {payload}) {
      state.results = payload
    }
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

export const sendResults = (arr: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { sprint } = getState()
    arr[0].forEach((el: any) => {
      const item: any = sprint.words.find((w: any) => w._id === el._id)
      const obj = {
        difficulty: "easy",
        optional: {
          learned: true
        } 
      }
      if(item.userWord) {
        usersWords.updateUserWord(item._id, obj)
      } else {
        usersWords.createUserWord(item._id, obj)
      }
    })
    arr[1].forEach((el: any) => {
      const item: any = sprint.words.find((w: any) => w._id === el._id)
      const obj = {
        difficulty: "hard",
        optional: {
          learned: false
        } 
      }
      if(item.userWord) {
        usersWords.updateUserWord(item._id, obj)
      } else {
        usersWords.createUserWord(item._id, obj)
      }
    })
  }
}

export const {
  setResults,
  displayResults,
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