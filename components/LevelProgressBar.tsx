import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';

export const LevelProgressBar: React.FC = () => {
  const progress = useAppSelector((state) => state.progress.progress);

  if (!progress) {
    return null;
  }

  const progressPercentage =
    progress.xpToNextLevel > 0
      ? ((progress.currentLevelXP / (progress.currentLevelXP + progress.xpToNextLevel)) * 100)
      : 100;

  return (
    <View className="w-full">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">Level {progress.level}</Text>
        <Text className="text-sm text-gray-600">
          {progress.currentLevelXP} / {progress.currentLevelXP + progress.xpToNextLevel} XP
        </Text>
      </View>
      <View className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>
      {progress.xpToNextLevel > 0 && (
        <Text className="text-xs text-gray-500 mt-1">
          {progress.xpToNextLevel} XP to next level
        </Text>
      )}
    </View>
  );
};
