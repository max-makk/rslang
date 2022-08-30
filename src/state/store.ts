import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import textbookReducer from './reducers/textbook'
import sprintReducer from './reducers/sprint'


export const store = configureStore({
  reducer: {
    user: userReducer,
    textbook: textbookReducer,
    sprint: sprintReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch