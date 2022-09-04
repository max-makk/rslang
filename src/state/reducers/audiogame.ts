import { createSlice } from '@reduxjs/toolkit';
import { IWord } from '../../types/types';

interface AudioGameState {
  words: IWord[],
  page: number,
  group: number,
  unlearnedIds: string[],
}

const initialState : AudioGameState = {
  words: [],
  page: 0,
  group: 0,
  unlearnedIds: [],
};

const audioGameSlice = createSlice({
  name: 'audiogame',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setGroup(state, action) {
      state.group = action.payload;
    },
    setWords(state, { payload }) {
      state.words = payload;
    },
    seUnlearnedtWordIds(state, { payload }) {
      state.unlearnedIds = [...state.unlearnedIds, payload];
    },
  },
});

export const { setGroup, setPage, setWords, seUnlearnedtWordIds } = audioGameSlice.actions;
export default audioGameSlice.reducer;
