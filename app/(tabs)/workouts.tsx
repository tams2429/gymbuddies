import { View, Text, ScrollView } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function WorkoutsScreen() {
  const workouts = useAppSelector((state) => state.workouts.workouts);
  const isLoading = useAppSelector((state) => state.workouts.isLoading);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading workouts...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">My Workouts</Text>

      {workouts.length === 0 ? (
        <View className="items-center justify-center py-8">
          <Text className="text-gray-500 text-center">
            No workouts yet. Start logging your workouts to see them here!
          </Text>
        </View>
      ) : (
        workouts.map((workout) => (
          <View
            key={workout.id}
            className="bg-gray-50 p-4 rounded-lg mb-3"
          >
            <Text className="text-lg font-semibold">{workout.type}</Text>
            <Text className="text-gray-600">
              Duration: {workout.duration} minutes
            </Text>
            <Text className="text-gray-600">
              Calories: {workout.calories} kcal
            </Text>
            {workout.xpEarned && (
              <Text className="text-blue-600 font-semibold">
                +{workout.xpEarned} XP
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
