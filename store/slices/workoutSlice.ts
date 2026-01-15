import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '@/types';
import { Timestamp } from '@react-native-firebase/firestore';

interface WorkoutState {
  workouts: Workout[];
  isLoading: boolean;
  error: string | null;
  lastSyncDate: Date | null;
}

const initialState: WorkoutState = {
  workouts: [],
  isLoading: false,
  error: null,
  lastSyncDate: null,
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.unshift(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(
        (w) => w.id === action.payload.id
      );
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.workouts = state.workouts.filter((w) => w.id !== action.payload);
    },
    setLastSyncDate: (state, action: PayloadAction<Date>) => {
      state.lastSyncDate = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  setLastSyncDate,
} = workoutSlice.actions;

export default workoutSlice.reducer;
