// src/store/gamesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    status: 'idle',
    error: null,
    filters: {
      platforms: '',
      genres: '',
      ordering: '-rating'
    }
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
      state.status = 'succeeded';
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  }
});

export const { setGames, setFilters } = gamesSlice.actions;
export default gamesSlice.reducer;