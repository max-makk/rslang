import { createSlice } from "@reduxjs/toolkit";
import { getWords, getUserWords } from "../thunks";

const initialState = {
  words: [],
  learned: [],
  difficult: [],
  page: '0',
  group: '0',
  loading: ''
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
    }
  },
  extraReducers: (builder) => {
    builder
    // builder.addCase(getUserWords.fulfilled, (state, action) => {
    //   const learned = action.payload
    // })
    .addCase(getWords.fulfilled, (state, action) => {
      state.words = action.payload
      state.loading = 'succeeded'
    })
    .addCase(getWords.pending, (state, action) => {
      state.loading = 'pending'
    })
    .addCase(getWords.rejected, (state, action) => {
      state.loading = 'failed'
    })
    .addCase(getUserWords.fulfilled, (state, action) => {
      console.log(action.payload)
      state.difficult = action.payload // filter?
      state.learned = action.payload
      state.loading = 'succeeded'
    })
    .addCase(getUserWords.pending, (state, action) => {
      state.loading = 'pending'
    })
    .addCase(getUserWords.rejected, (state, action) => {
      state.loading = 'failed'
    })

  }
})

export const { setPage } = textbookSlice.actions
export default textbookSlice.reducer