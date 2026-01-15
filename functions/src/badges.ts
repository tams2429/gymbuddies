import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * Cloud Function to unlock badges
 */
export const badges = functions.firestore
  .document('userAchievements/{achievementId}')
  .onCreate(async (snap, context) => {
    const userAchievement = snap.data();
    const userId = userAchievement.userId;

    // TODO: Implement badge unlocking logic
    // 1. Get achievement details
    // 2. Check if achievement has associated badge
    // 3. Unlock badge for user
    // 4. Send notification

    console.log(`Unlocking badge for achievement ${context.params.achievementId} for user ${userId}`);
    
    return null;
  });
