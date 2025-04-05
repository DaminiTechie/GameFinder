// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    favorites: favoritesReducer
  }
});
