import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import textbookReducer from './reducers/textbook'
import sprintReducer from './reducers/sprint'
import notificationReducer from './reducers/notification'


export const store = configureStore({
  reducer: {
    user: userReducer,
    textbook: textbookReducer,
    sprint: sprintReducer,
    notification: notificationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch