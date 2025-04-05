// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load favorites from localStorage
const loadFavorites = () => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: {
    addFavorite: (state, action) => {
      if (!state.some(game => game.id === action.payload.id)) {
        const newState = [...state, action.payload];
        localStorage.setItem('favorites', JSON.stringify(newState));
        return newState;
      }
      return state;
    },
    removeFavorite: (state, action) => {
      const newState = state.filter(game => game.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(newState));
      return newState;
    },
    clearFavorites: () => {
      localStorage.removeItem('favorites');
      return [];
    }
  }
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
