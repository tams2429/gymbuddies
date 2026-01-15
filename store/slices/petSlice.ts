import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet, UserPet } from '@/types';

interface PetState {
  availablePets: Pet[];
  userPet: UserPet | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PetState = {
  availablePets: [],
  userPet: null,
  isLoading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAvailablePets: (state, action: PayloadAction<Pet[]>) => {
      state.availablePets = action.payload;
    },
    setUserPet: (state, action: PayloadAction<UserPet | null>) => {
      state.userPet = action.payload;
    },
    updatePetXP: (state, action: PayloadAction<number>) => {
      if (state.userPet) {
        state.userPet.totalXPContributed += action.payload;
      }
    },
    updatePetLevel: (state, action: PayloadAction<number>) => {
      if (state.userPet) {
        state.userPet.level = action.payload;
      }
    },
    updatePetStage: (state, action: PayloadAction<number>) => {
      if (state.userPet) {
        state.userPet.currentStage = action.payload;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setAvailablePets,
  setUserPet,
  updatePetXP,
  updatePetLevel,
  updatePetStage,
} = petSlice.actions;

export default petSlice.reducer;
