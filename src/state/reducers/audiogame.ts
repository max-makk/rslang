import { createSlice } from '@reduxjs/toolkit';
import { IWord } from '../../types/types';

interface AudioGameState {
  words: IWord[];
  page: number;
  group: number;
  unlearnedIds: string[];
  passedGrops: Record<string | number, number[]>;
}

const initialState: AudioGameState = {
  words: [],
  page: 0,
  group: 0,
  unlearnedIds: [],
  passedGrops: {},
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
    setUnlearnedtWordIds(state, { payload }) {
      state.unlearnedIds = [...state.unlearnedIds, payload];
    },
    resetsetUnlearnedtWordIds(state, { payload }) {
      state.unlearnedIds = payload;
    },
    setPassedGroup(state, { payload }) {
      state.passedGrops = { ...state.passedGrops, ...payload };
    }
  },
});

export const {
  setGroup,
  setPage,
  setWords,
  setUnlearnedtWordIds,
  setPassedGroup,
  resetsetUnlearnedtWordIds,
} = audioGameSlice.actions;
export default audioGameSlice.reducer;
