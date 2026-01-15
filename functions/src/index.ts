import * as functions from 'firebase-functions';
import { workoutXP } from './workoutXP';
import { levelUp } from './levelUp';
import { streakTracking } from './streakTracking';
import { achievements } from './achievements';
import { badges } from './badges';
import { petEvolution } from './petEvolution';
import { leaderboard } from './leaderboard';
import { notifications } from './notifications';

// Export all Cloud Functions
export {
  workoutXP,
  levelUp,
  streakTracking,
  achievements,
  badges,
  petEvolution,
  leaderboard,
  notifications,
};
