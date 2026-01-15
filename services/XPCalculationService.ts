import { XP_CONSTANTS, STREAK_CONSTANTS, LEVEL_CONSTANTS } from '@/constants';
import { Workout, UserProgress } from '@/types';
import { differenceInDays } from 'date-fns';

/**
 * Service for calculating XP from workouts
 */
class XPCalculationService {
  /**
   * Calculate XP for a workout
   */
  calculateWorkoutXP(
    workout: Workout,
    userProgress: UserProgress | null,
    maxHeartRate: number = XP_CONSTANTS.DEFAULT_MAX_HEART_RATE
  ): number {
    // Base XP: 10 points per minute
    const baseXP = workout.duration * XP_CONSTANTS.BASE_XP_PER_MINUTE;

    // Intensity multiplier based on heart rate
    const intensityMultiplier = this.calculateIntensityMultiplier(
      workout.heartRate,
      maxHeartRate
    );

    // Streak multiplier
    const streakMultiplier = this.calculateStreakMultiplier(
      workout.date.toDate(),
      userProgress
    );

    // Total XP calculation
    const totalXP = Math.round(
      baseXP * intensityMultiplier * streakMultiplier
    );

    return totalXP;
  }

  /**
   * Calculate intensity multiplier based on heart rate
   */
  private calculateIntensityMultiplier(
    heartRate?: { average?: number; max?: number; min?: number },
    maxHeartRate: number = XP_CONSTANTS.DEFAULT_MAX_HEART_RATE
  ): number {
    if (!heartRate?.average) {
      return XP_CONSTANTS.INTENSITY_MULTIPLIERS.LOW;
    }

    const heartRatePercentage = heartRate.average / maxHeartRate;

    if (heartRatePercentage >= XP_CONSTANTS.HEART_RATE_THRESHOLDS.MAX_EFFORT_MIN) {
      return XP_CONSTANTS.INTENSITY_MULTIPLIERS.MAX;
    } else if (
      heartRatePercentage >= XP_CONSTANTS.HEART_RATE_THRESHOLDS.HIGH_INTENSITY_MIN
    ) {
      return XP_CONSTANTS.INTENSITY_MULTIPLIERS.HIGH;
    }

    return XP_CONSTANTS.INTENSITY_MULTIPLIERS.LOW;
  }

  /**
   * Calculate streak multiplier based on workout consistency
   */
  private calculateStreakMultiplier(
    workoutDate: Date,
    userProgress: UserProgress | null
  ): number {
    if (!userProgress?.lastWorkoutDate) {
      return 1.0; // First workout, no streak bonus
    }

    const lastWorkoutDate = userProgress.lastWorkoutDate.toDate();
    const daysSinceLastWorkout = differenceInDays(workoutDate, lastWorkoutDate);

    if (daysSinceLastWorkout <= STREAK_CONSTANTS.STREAK_ACTIVE_WITHIN_DAYS) {
      return XP_CONSTANTS.STREAK_MULTIPLIERS.WITHIN_2_DAYS;
    } else if (daysSinceLastWorkout <= STREAK_CONSTANTS.CONSISTENCY_BONUS_WITHIN_DAYS) {
      return XP_CONSTANTS.STREAK_MULTIPLIERS.WITHIN_4_DAYS;
    }

    return 1.0; // No streak bonus
  }

  /**
   * Calculate XP required for a specific level
   */
  calculateXPForLevel(level: number): number {
    if (level <= 1) return 0;
    
    let totalXP = 0;
    for (let i = 2; i <= level; i++) {
      totalXP += Math.floor(
        XP_CONSTANTS.BASE_XP_REQUIRED *
          Math.pow(LEVEL_CONSTANTS.XP_MULTIPLIER, i - 2)
      );
    }
    return totalXP;
  }

  /**
   * Calculate level from total XP
   */
  calculateLevelFromXP(totalXP: number): number {
    let level = 1;
    let xpRequired = 0;

    while (xpRequired <= totalXP && level < LEVEL_CONSTANTS.MAX_LEVEL) {
      level++;
      xpRequired += Math.floor(
        XP_CONSTANTS.BASE_XP_REQUIRED *
          Math.pow(LEVEL_CONSTANTS.XP_MULTIPLIER, level - 2)
      );
    }

    return Math.min(level - 1, LEVEL_CONSTANTS.MAX_LEVEL);
  }

  /**
   * Calculate XP needed for next level
   */
  calculateXPToNextLevel(currentLevel: number, currentXP: number): number {
    const nextLevelXP = this.calculateXPForLevel(currentLevel + 1);
    return Math.max(0, nextLevelXP - currentXP);
  }
}

export const xpCalculationService = new XPCalculationService();
export default xpCalculationService;
