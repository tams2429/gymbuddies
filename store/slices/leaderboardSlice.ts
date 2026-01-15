import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeaderboardEntry } from '@/types';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  currentPeriod: 'daily' | 'weekly' | 'monthly' | 'alltime';
  currentScope: 'global' | 'friends';
  isLoading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  entries: [],
  currentPeriod: 'weekly',
  currentScope: 'friends',
  isLoading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setEntries: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.entries = action.payload;
    },
    setPeriod: (
      state,
      action: PayloadAction<'daily' | 'weekly' | 'monthly' | 'alltime'>
    ) => {
      state.currentPeriod = action.payload;
    },
    setScope: (state, action: PayloadAction<'global' | 'friends'>) => {
      state.currentScope = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setEntries,
  setPeriod,
  setScope,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
