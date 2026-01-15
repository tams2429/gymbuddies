import { Timestamp } from '@react-native-firebase/firestore';

// Workout Types
export interface Workout {
  id: string;
  userId: string;
  type: string;
  duration: number; // minutes
  calories: number;
  distance?: number;
  date: Timestamp;
  source: 'healthkit' | 'healthconnect' | 'manual';
  healthDataId?: string;
  notes?: string;
  photos?: string[];
  heartRate?: {
    average?: number;
    max?: number;
    min?: number;
  };
  intensity?: 'low' | 'moderate' | 'high' | 'max';
  xpEarned?: number;
}

// User Progress Types
export interface UserProgress {
  userId: string;
  level: number;
  totalXP: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  achievementPoints: number;
  lastWorkoutDate?: Timestamp;
  currentStreak: number;
  longestStreak: number;
  unlockedFeatures: string[];
}

// Leaderboard Types
export interface LeaderboardEntry {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'alltime';
  scope: 'global' | 'friends';
  xp: number;
  rank: number;
  lastUpdated: Timestamp;
}

// Friendship Types
export interface Friendship {
  id: string;
  user1Id: string;
  user2Id: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Timestamp;
}

// Badge Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'milestone' | 'streak' | 'volume' | 'time' | 'pr' | 'special';
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  unlockedAt: Timestamp;
  progress?: number;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'milestone' | 'volume' | 'time' | 'pr' | 'streak';
  criteria: {
    type: 'workout_count' | 'total_hours' | 'streak_days' | 'pr_type' | 'custom';
    target: number;
    exerciseType?: string;
  };
  xpReward: number;
  badgeId?: string;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: Timestamp;
  progress: number;
  isUnlocked: boolean;
}

// Title Types
export interface Title {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'consistency' | 'variety' | 'special';
  unlockCriteria: {
    type: 'level' | 'achievement' | 'workout_distribution' | 'leaderboard';
    value: unknown;
  };
}

export interface UserTitle {
  userId: string;
  titleId: string;
  unlockedAt: Timestamp;
  isActive: boolean;
}

// Pet Types
export interface PetEvolutionStage {
  stage: number;
  name: string;
  image: string;
  xpRequired: number;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  baseImage: string;
  evolutionStages: PetEvolutionStage[];
  unlockLevel: number;
}

export interface UserPet {
  userId: string;
  petId: string;
  level: number;
  currentStage: number;
  totalXPContributed: number;
  unlockedAt: Timestamp;
  customization?: {
    color?: string;
    accessories?: string[];
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}
