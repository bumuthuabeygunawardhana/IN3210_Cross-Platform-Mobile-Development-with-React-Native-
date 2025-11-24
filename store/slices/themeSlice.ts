import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeState } from '../../types';

const THEME_KEY = '@fithub_theme';

const initialState: ThemeState = {
  isDark: false,
};

// Async thunks
export const loadTheme = createAsyncThunk(
  'theme/load',
  async () => {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return theme === 'dark';
    } catch (error) {
      return false;
    }
  }
);

export const saveTheme = createAsyncThunk(
  'theme/save',
  async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      return isDark;
    } catch (error) {
      throw error;
    }
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTheme.fulfilled, (state, action) => {
      state.isDark = action.payload;
    });
    builder.addCase(saveTheme.fulfilled, (state, action) => {
      state.isDark = action.payload;
    });
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
