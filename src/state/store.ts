import { configureStore } from '@reduxjs/toolkit'
import wordReducer from './reducers/wordReducer'

export const store = configureStore({
  reducer: {
    words: wordReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch