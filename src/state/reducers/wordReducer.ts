import { createSlice } from "@reduxjs/toolkit";
import wordsService from '../../services/words'
import { Dispatch } from "redux";

const slice = createSlice({
  name: 'words',
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload
    }
  }
})

export const initializeWords = () => {
  return async (dispatch: Dispatch) => {
    wordsService.getAllWords().then((response) => {
      dispatch(initializeWith(response))
    })
  }
}

const { initializeWith } = slice.actions
export default slice.reducer