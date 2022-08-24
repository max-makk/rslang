import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import wordReducer from './slices/wordsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    words: wordReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch