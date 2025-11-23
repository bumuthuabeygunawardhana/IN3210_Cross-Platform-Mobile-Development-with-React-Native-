import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { exerciseAPI } from '../../services/api';
import { ExerciseState, Exercise } from '../../types';

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
  selectedExercise: null,
};

// Async thunks
export const fetchExercises = createAsyncThunk(
  'exercises/fetch',
  async (muscle: string = '', { rejectWithValue }) => {
    try {
      const response = await exerciseAPI.getExercises(muscle);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch exercises');
    }
  }
);

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setSelectedExercise: (state, action: PayloadAction<Exercise>) => {
      state.selectedExercise = action.payload;
    },
    clearSelectedExercise: (state) => {
      state.selectedExercise = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload;
      state.error = null;
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSelectedExercise, clearSelectedExercise, clearError } = exerciseSlice.actions;
export default exerciseSlice.reducer;
