import { View, Text, ScrollView } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';
import { LevelProgressBar } from '@/components/LevelProgressBar';
import { PetDisplay } from '@/components/PetDisplay';

export default function ProfileScreen() {
  const progress = useAppSelector((state) => state.progress.progress);
  const userBadges = useAppSelector((state) => state.achievements.userBadges);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Profile</Text>

      {progress && (
        <View className="mb-6">
          <LevelProgressBar />
        </View>
      )}

      <View className="mb-6">
        <Text className="text-xl font-semibold mb-4">Your Pet</Text>
        <PetDisplay size="large" />
      </View>

      <View className="mb-6">
        <Text className="text-xl font-semibold mb-4">
          Badges ({userBadges.length})
        </Text>
        <View className="flex-row flex-wrap">
          {userBadges.length === 0 ? (
            <Text className="text-gray-500">
              No badges yet. Complete achievements to earn badges!
            </Text>
          ) : (
            userBadges.map((userBadge) => (
              <View
                key={userBadge.badgeId}
                className="w-16 h-16 bg-gray-200 rounded-lg m-2 items-center justify-center"
              >
                <Text className="text-2xl">🏅</Text>
              </View>
            ))
          )}
        </View>
      </View>

      {progress && (
        <View className="mb-6">
          <Text className="text-xl font-semibold mb-4">Stats</Text>
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-gray-600 mb-2">
              Current Streak: {progress.currentStreak} days
            </Text>
            <Text className="text-gray-600 mb-2">
              Longest Streak: {progress.longestStreak} days
            </Text>
            <Text className="text-gray-600">
              Total XP: {progress.totalXP}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
