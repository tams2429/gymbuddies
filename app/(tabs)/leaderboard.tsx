import { View, Text, ScrollView } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function LeaderboardScreen() {
  const entries = useAppSelector((state) => state.leaderboard.entries);
  const currentPeriod = useAppSelector((state) => state.leaderboard.currentPeriod);
  const isLoading = useAppSelector((state) => state.leaderboard.isLoading);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading leaderboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">
        Leaderboard - {currentPeriod}
      </Text>

      {entries.length === 0 ? (
        <View className="items-center justify-center py-8">
          <Text className="text-gray-500 text-center">
            No leaderboard entries yet. Complete workouts to appear on the leaderboard!
          </Text>
        </View>
      ) : (
        entries.map((entry, index) => (
          <View
            key={entry.userId}
            className="flex-row items-center bg-gray-50 p-4 rounded-lg mb-2"
          >
            <Text className="text-xl font-bold w-8">{entry.rank}</Text>
            <View className="flex-1">
              <Text className="text-lg font-semibold">User {entry.userId}</Text>
              <Text className="text-gray-600">{entry.xp} XP</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
