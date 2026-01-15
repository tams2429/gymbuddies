import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './slices/workoutSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import progressReducer from './slices/progressSlice';
import achievementReducer from './slices/achievementSlice';
import petReducer from './slices/petSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
    leaderboard: leaderboardReducer,
    progress: progressReducer,
    achievements: achievementReducer,
    pet: petReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
