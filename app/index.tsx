import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function HomeScreen() {
  const progress = useAppSelector((state) => state.progress.progress);

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-3xl font-bold mb-4">GymBuddies</Text>
      <Text className="text-lg text-gray-600 mb-8">
        Your Fitness Tracking Companion
      </Text>

      {progress && (
        <View className="w-full mb-8">
          <Text className="text-xl font-semibold mb-2">
            Level {progress.level}
          </Text>
          <Text className="text-gray-600">
            Total XP: {progress.totalXP}
          </Text>
          <Text className="text-gray-600">
            Current Streak: {progress.currentStreak} days
          </Text>
        </View>
      )}

      <View className="w-full space-y-4">
        <Link href="/(tabs)/workouts" asChild>
          <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              View Workouts
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/leaderboard" asChild>
          <TouchableOpacity className="bg-green-500 p-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Leaderboard
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity className="bg-purple-500 p-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Profile
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
