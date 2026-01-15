import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Badge } from '@/types';

interface BadgeGridProps {
  onBadgePress?: (badge: Badge) => void;
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({ onBadgePress }) => {
  const badges = useAppSelector((state) => state.achievements.badges);
  const userBadges = useAppSelector((state) => state.achievements.userBadges);

  const userBadgeIds = new Set(userBadges.map((ub) => ub.badgeId));

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-300';
      case 'rare':
        return 'bg-blue-300';
      case 'epic':
        return 'bg-purple-300';
      case 'legendary':
        return 'bg-yellow-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="flex-row flex-wrap p-4">
        {badges.map((badge) => {
          const isUnlocked = userBadgeIds.has(badge.id);
          return (
            <TouchableOpacity
              key={badge.id}
              onPress={() => onBadgePress?.(badge)}
              className={`w-20 h-20 m-2 rounded-lg items-center justify-center ${
                isUnlocked ? getRarityColor(badge.rarity) : 'bg-gray-100 opacity-50'
              }`}
            >
              <Text className="text-2xl mb-1">{badge.icon}</Text>
              {isUnlocked && (
                <View className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
