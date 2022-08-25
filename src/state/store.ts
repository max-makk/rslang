import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import wordReducer from './slices/wordsSlice'
import textbookReducer from './slices/textbookSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    words: wordReducer,
    textbook: textbookReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch