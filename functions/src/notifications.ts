import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * Cloud Function to send push notifications
 */
export const sendNotification = async (
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> => {
  // TODO: Implement push notification logic
  // 1. Get user's FCM token
  // 2. Send notification via FCM
  // 3. Handle errors

  console.log(`Sending notification to user ${userId}: ${title} - ${body}`);
};

/**
 * Trigger notifications for various events
 */
export const notifications = {
  onLevelUp: functions.firestore
    .document('userProgress/{userId}')
    .onUpdate(async (change, context) => {
      const oldProgress = change.before.data();
      const newProgress = change.after.data();

      if (newProgress.level > oldProgress.level) {
        await sendNotification(
          context.params.userId,
          'Level Up! 🎉',
          `You've reached Level ${newProgress.level}!`
        );
      }

      return null;
    }),

  onAchievementUnlocked: functions.firestore
    .document('userAchievements/{achievementId}')
    .onCreate(async (snap, context) => {
      const userAchievement = snap.data();
      
      await sendNotification(
        userAchievement.userId,
        'Achievement Unlocked! 🏆',
        `You've unlocked a new achievement!`
      );

      return null;
    }),

  onBadgeEarned: functions.firestore
    .document('userBadges/{badgeId}')
    .onCreate(async (snap, context) => {
      const userBadge = snap.data();
      
      await sendNotification(
        userBadge.userId,
        'Badge Earned! 🎖️',
        `You've earned a new badge!`
      );

      return null;
    }),
};
