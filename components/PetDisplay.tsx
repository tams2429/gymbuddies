import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';

interface PetDisplayProps {
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const PetDisplay: React.FC<PetDisplayProps> = ({
  onPress,
  size = 'medium',
}) => {
  const userPet = useAppSelector((state) => state.pet.userPet);
  const availablePets = useAppSelector((state) => state.pet.availablePets);

  if (!userPet) {
    return (
      <View className="items-center justify-center p-4">
        <Text className="text-gray-500">No pet yet. Unlock at Level 10!</Text>
      </View>
    );
  }

  const pet = availablePets.find((p) => p.id === userPet.petId);
  if (!pet) {
    return null;
  }

  const currentStage = pet.evolutionStages[userPet.currentStage] || pet.evolutionStages[0];

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
  };

  const content = (
    <View className="items-center">
      <View className={`${sizeClasses[size]} rounded-full bg-gray-100 items-center justify-center mb-2`}>
        {currentStage.image ? (
          <Image
            source={{ uri: currentStage.image }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-4xl">🐾</Text>
        )}
      </View>
      <Text className="font-semibold">{pet.name}</Text>
      <Text className="text-sm text-gray-600">Level {userPet.level}</Text>
      <Text className="text-xs text-gray-500">{currentStage.name}</Text>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};
