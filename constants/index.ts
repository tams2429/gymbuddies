// XP Calculation Constants
export const XP_CONSTANTS = {
  BASE_XP_PER_MINUTE: 10,
  INTENSITY_MULTIPLIERS: {
    LOW: 1.0,
    HIGH: 1.5, // Heart rate 70-85% max
    MAX: 2.0, // Heart rate >85% max
  },
  STREAK_MULTIPLIERS: {
    WITHIN_4_DAYS: 1.1,
    WITHIN_2_DAYS: 1.2,
  },
  HEART_RATE_THRESHOLDS: {
    HIGH_INTENSITY_MIN: 0.70, // 70% of max heart rate
    MAX_EFFORT_MIN: 0.85, // 85% of max heart rate
  },
  DEFAULT_MAX_HEART_RATE: 220, // Can be calculated as 220 - age
} as const;

// Level Constants
export const LEVEL_CONSTANTS = {
  MIN_LEVEL: 1,
  MAX_LEVEL: 100,
  BASE_XP_REQUIRED: 100,
  XP_MULTIPLIER: 1.15, // Exponential growth factor
} as const;

// Streak Constants
export const STREAK_CONSTANTS = {
  STREAK_ACTIVE_WITHIN_DAYS: 2,
  CONSISTENCY_BONUS_WITHIN_DAYS: 4,
} as const;

// Pet Constants
export const PET_CONSTANTS = {
  XP_PERCENTAGE_TO_PET: 0.15, // 15% of workout XP goes to pet
  UNLOCK_LEVEL: 10,
} as const;

// Workout Types
export const WORKOUT_TYPES = [
  'Running',
  'Cycling',
  'Walking',
  'Swimming',
  'Strength Training',
  'Yoga',
  'Pilates',
  'HIIT',
  'CrossFit',
  'Rowing',
  'Other',
] as const;
