import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProgress } from '@/types';

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: null,
  isLoading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProgress: (state, action: PayloadAction<UserProgress>) => {
      state.progress = action.payload;
    },
    updateXP: (state, action: PayloadAction<number>) => {
      if (state.progress) {
        state.progress.totalXP += action.payload;
        state.progress.currentLevelXP += action.payload;
      }
    },
    levelUp: (state, action: PayloadAction<number>) => {
      if (state.progress) {
        state.progress.level = action.payload;
        state.progress.currentLevelXP = 0;
      }
    },
    updateStreak: (
      state,
      action: PayloadAction<{ current: number; longest: number }>
    ) => {
      if (state.progress) {
        state.progress.currentStreak = action.payload.current;
        state.progress.longestStreak = Math.max(
          state.progress.longestStreak,
          action.payload.longest
        );
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProgress,
  updateXP,
  levelUp,
  updateStreak,
} = progressSlice.actions;

export default progressSlice.reducer;
