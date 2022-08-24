import { createSlice } from "@reduxjs/toolkit";

import {
  getWords
} from '../thunks'

interface WordsState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: [],
  loading: 'idle',
} as WordsState



const slice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getWords.fulfilled, (state, action) => {
      state.entities = action.payload
      state.loading = 'succeeded'
    })
    .addCase(getWords.pending, (state, action) => {
      state.loading = 'pending'
    })
    .addCase(getWords.rejected, (state, action) => {
      state.loading = 'failed'
    })
  }
})

// const {  } = slice.actions
export default slice.reducer