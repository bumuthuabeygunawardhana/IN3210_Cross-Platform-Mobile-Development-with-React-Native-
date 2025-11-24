import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleFavorite, saveFavorites } from '@/store/slices/favoritesSlice';
import { Exercise } from '@/types';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isDark = useAppSelector((state) => state.theme.isDark);

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#B0B0B0' : '#666666',
    primary: '#4CAF50',
    border: isDark ? '#333333' : '#E0E0E0',
  };

  const handleExercisePress = (exercise: Exercise) => {
    router.push({
      pathname: '/exercise-details',
      params: { exercise: JSON.stringify(exercise) },
    } as any);
  };

  const handleRemoveFavorite = async (exercise: Exercise) => {
    dispatch(toggleFavorite(exercise));
    const updatedFavorites = favorites.filter(fav => fav.name !== exercise.name);
    await dispatch(saveFavorites(updatedFavorites));
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

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={[styles.exerciseCard, { backgroundColor: colors.card }]}
      onPress={() => handleExercisePress(item)}
      activeOpacity={0.7}
    >
      {item.image ? (
        <View style={styles.cardImageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleRemoveFavorite(item)}
          >
            <Feather name="heart" size={24} color="#F44336" fill="#F44336" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.cardHeader, { backgroundColor: colors.primary + '20' }]}>
          <Feather name="activity" size={40} color={colors.primary} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleRemoveFavorite(item)}
          >
            <Feather name="heart" size={24} color="#F44336" fill="#F44336" />
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.cardTags}>
          <View style={[styles.tag, { backgroundColor: colors.primary + '20' }]}>
            <Feather name="target" size={12} color={colors.primary} />
            <Text style={[styles.tagText, { color: colors.primary }]}>
              {item.muscle}
            </Text>
          </View>
          
          <View style={[styles.tag, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
            <Feather name="bar-chart-2" size={12} color={getDifficultyColor(item.difficulty)} />
            <Text style={[styles.tagText, { color: getDifficultyColor(item.difficulty) }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        <Text style={[styles.cardDescription, { color: colors.textSecondary }]} numberOfLines={3}>
          {item.instructions}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.footerItem}>
            <Feather name="box" size={14} color={colors.textSecondary} />
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {item.equipment.replace(/_/g, ' ')}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <Feather name="heart" size={28} color="#F44336" />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Favorites</Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {favorites.length} {favorites.length === 1 ? 'exercise' : 'exercises'} saved
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderExerciseCard}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Start adding exercises to your favorites!
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.buttonText}>Explore Exercises</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  exerciseCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  cardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTags: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
