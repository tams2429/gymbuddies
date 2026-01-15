import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement, UserAchievement, Badge, UserBadge } from '@/types';

interface AchievementState {
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  badges: Badge[];
  userBadges: UserBadge[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AchievementState = {
  achievements: [],
  userAchievements: [],
  badges: [],
  userBadges: [],
  isLoading: false,
  error: null,
};

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAchievements: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload;
    },
    setUserAchievements: (state, action: PayloadAction<UserAchievement[]>) => {
      state.userAchievements = action.payload;
    },
    addUserAchievement: (state, action: PayloadAction<UserAchievement>) => {
      state.userAchievements.push(action.payload);
    },
    updateAchievementProgress: (
      state,
      action: PayloadAction<{ achievementId: string; progress: number }>
    ) => {
      const achievement = state.userAchievements.find(
        (a) => a.achievementId === action.payload.achievementId
      );
      if (achievement) {
        achievement.progress = action.payload.progress;
      }
    },
    setBadges: (state, action: PayloadAction<Badge[]>) => {
      state.badges = action.payload;
    },
    setUserBadges: (state, action: PayloadAction<UserBadge[]>) => {
      state.userBadges = action.payload;
    },
    addUserBadge: (state, action: PayloadAction<UserBadge>) => {
      state.userBadges.push(action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setAchievements,
  setUserAchievements,
  addUserAchievement,
  updateAchievementProgress,
  setBadges,
  setUserBadges,
  addUserBadge,
} = achievementSlice.actions;

export default achievementSlice.reducer;
