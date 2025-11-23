import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesState, Exercise } from '../../types';

const FAVORITES_KEY = '@fitbuddy_favorites';

const initialState: FavoritesState = {
  favorites: [],
};

// Async thunks
export const loadFavorites = createAsyncThunk(
  'favorites/load',
  async () => {
    try {
      const favoritesStr = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesStr) {
        return JSON.parse(favoritesStr) as Exercise[];
      }
      return [];
    } catch (error) {
      return [];
    }
  }
);

export const saveFavorites = createAsyncThunk(
  'favorites/save',
  async (favorites: Exercise[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return favorites;
    } catch (error) {
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Exercise>) => {
      const exists = state.favorites.find(ex => ex.name === action.payload.name);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(ex => ex.name !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Exercise>) => {
      const index = state.favorites.findIndex(ex => ex.name === action.payload.name);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(saveFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
