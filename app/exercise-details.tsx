import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleFavorite, saveFavorites } from '@/store/slices/favoritesSlice';
import { Exercise } from '@/types';

const { width } = Dimensions.get('window');

export default function ExerciseDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  
  // Parse exercise from params
  const exercise: Exercise = params.exercise ? JSON.parse(params.exercise as string) : null;
  
  if (!exercise) {
    return null;
  }

  const isFavorite = favorites.some(fav => fav.name === exercise.name);

  const handleToggleFavorite = async () => {
    dispatch(toggleFavorite(exercise));
    const updatedFavorites = isFavorite 
      ? favorites.filter(fav => fav.name !== exercise.name)
      : [...favorites, exercise];
    await dispatch(saveFavorites(updatedFavorites));
  };

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#B0B0B0' : '#666666',
    primary: '#4CAF50',
    border: isDark ? '#333333' : '#E0E0E0',
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'expert':
        return '#F44336';
      default:
        return colors.primary;
    }
  };

  const getMuscleIcon = (muscle: string): "activity" | "award" | "shield" | "trending-up" | "zap" | "star" | "target" => {
    const muscleMap: { [key: string]: "activity" | "award" | "shield" | "trending-up" | "zap" | "star" | "target" } = {
      chest: 'award',
      back: 'shield',
      legs: 'trending-up',
      arms: 'zap',
      shoulders: 'star',
      abs: 'target',
      abdominals: 'target',
      quadriceps: 'trending-up',
      biceps: 'zap',
      triceps: 'zap',
    };
    return muscleMap[muscle.toLowerCase()] || 'activity';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {exercise.name}
        </Text>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.headerButton}>
          <Feather 
            name={isFavorite ? 'heart' : 'heart'} 
            size={24} 
            color={isFavorite ? '#F44336' : colors.text}
            fill={isFavorite ? '#F44336' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {exercise.image ? (
          <View style={styles.heroImage}>
            <Image 
              source={{ uri: exercise.image }} 
              style={styles.exerciseImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Feather name={getMuscleIcon(exercise.muscle)} size={48} color="#FFFFFF" />
              <Text style={styles.heroTitle}>{exercise.name}</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
            <Feather name={getMuscleIcon(exercise.muscle)} size={64} color="#FFFFFF" />
            <Text style={styles.heroTitle}>{exercise.name}</Text>
          </View>
        )}

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Feather name="target" size={20} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Muscle</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.slice(1)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Feather name="activity" size={20} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Type</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Feather name="box" size={20} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Equipment</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {exercise.equipment.replace(/_/g, ' ').charAt(0).toUpperCase() + 
                 exercise.equipment.replace(/_/g, ' ').slice(1)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Feather name="bar-chart-2" size={20} color={getDifficultyColor(exercise.difficulty)} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Difficulty</Text>
              <Text style={[styles.detailValue, { color: getDifficultyColor(exercise.difficulty) }]}>
                {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.instructionHeader}>
            <Feather name="book-open" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>
              Full Description & Instructions
            </Text>
          </View>
          <View style={[styles.descriptionBox, { backgroundColor: colors.background }]}>
            <Text style={[styles.instructions, { color: colors.text }]}>
              {exercise.instructions}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.recommendationHeader}>
            <Feather name="award" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>
              Training Recommendations
            </Text>
          </View>
          <View style={styles.recommendation}>
            <Feather name="check-circle" size={20} color={colors.primary} />
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              Perform 3-4 sets of 8-12 repetitions
            </Text>
          </View>
          <View style={styles.recommendation}>
            <Feather name="check-circle" size={20} color={colors.primary} />
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              Rest 60-90 seconds between sets
            </Text>
          </View>
          <View style={styles.recommendation}>
            <Feather name="check-circle" size={20} color={colors.primary} />
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              Focus on proper form over speed
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heroCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    margin: 16,
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  card: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  detailLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionBox: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 26,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
});
