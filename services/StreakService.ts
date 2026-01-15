import { differenceInDays } from 'date-fns';
import { Timestamp } from '@react-native-firebase/firestore';
import { UserProgress } from '@/types';
import { STREAK_CONSTANTS } from '@/constants';

/**
 * Service for tracking workout streaks
 */
class StreakService {
  /**
   * Calculate current streak based on workout dates
   */
  calculateStreak(
    lastWorkoutDate: Date | Timestamp | null | undefined,
    currentWorkoutDate: Date
  ): { currentStreak: number; longestStreak: number } {
    if (!lastWorkoutDate) {
      return { currentStreak: 1, longestStreak: 1 };
    }

    const lastDate =
      lastWorkoutDate instanceof Timestamp
        ? lastWorkoutDate.toDate()
        : lastWorkoutDate;

    const daysSinceLastWorkout = differenceInDays(currentWorkoutDate, lastDate);

    // If workout is within streak threshold, increment streak
    if (daysSinceLastWorkout <= STREAK_CONSTANTS.STREAK_ACTIVE_WITHIN_DAYS) {
      // This would need to be calculated from all workout history
      // For now, we'll assume the streak continues
      return { currentStreak: 1, longestStreak: 1 };
    }

    // Streak broken
    return { currentStreak: 1, longestStreak: 1 };
  }

  /**
   * Check if streak is active (workout within threshold days)
   */
  isStreakActive(
    lastWorkoutDate: Date | Timestamp | null | undefined,
    currentDate: Date = new Date()
  ): boolean {
    if (!lastWorkoutDate) return false;

    const lastDate =
      lastWorkoutDate instanceof Timestamp
        ? lastWorkoutDate.toDate()
        : lastWorkoutDate;

    const daysSinceLastWorkout = differenceInDays(currentDate, lastDate);
    return daysSinceLastWorkout <= STREAK_CONSTANTS.STREAK_ACTIVE_WITHIN_DAYS;
  }

  /**
   * Check if consistency bonus applies (workout within 4 days)
   */
  hasConsistencyBonus(
    lastWorkoutDate: Date | Timestamp | null | undefined,
    currentDate: Date = new Date()
  ): boolean {
    if (!lastWorkoutDate) return false;

    const lastDate =
      lastWorkoutDate instanceof Timestamp
        ? lastWorkoutDate.toDate()
        : lastWorkoutDate;

    const daysSinceLastWorkout = differenceInDays(currentDate, lastDate);
    return daysSinceLastWorkout <= STREAK_CONSTANTS.CONSISTENCY_BONUS_WITHIN_DAYS;
  }
}

export const streakService = new StreakService();
export default streakService;
