import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExercises } from '@/store/slices/exerciseSlice';
import { Exercise } from '@/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { exercises, loading } = useAppSelector((state) => state.exercises);
  const { user } = useAppSelector((state) => state.auth);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#B0B0B0' : '#666666',
    primary: '#4CAF50',
    border: isDark ? '#333333' : '#E0E0E0',
  };

  useEffect(() => {
    loadExercises();
  }, [selectedMuscle]);

  const loadExercises = () => {
    dispatch(fetchExercises(selectedMuscle));
  };

  const handleExercisePress = (exercise: Exercise) => {
    router.push({
      pathname: '/exercise-details',
      params: { exercise: JSON.stringify(exercise) },
    } as any);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const muscles = ['', 'chest', 'back', 'legs', 'shoulders', 'arms', 'abs'];

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

  const isFavorite = (exerciseName: string) => {
    return favorites.some(fav => fav.name === exerciseName);
  };

  const renderExerciseCard = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={[styles.exerciseCard, { backgroundColor: colors.card }]}
      onPress={() => handleExercisePress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.cardHeader, { backgroundColor: colors.primary + '20' }]}>
        <Feather name="activity" size={40} color={colors.primary} />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
            {item.name}
          </Text>
          {isFavorite(item.name) && (
            <Feather name="heart" size={20} color="#F44336" fill="#F44336" />
          )}
        </View>

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
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.username, { color: colors.text }]}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Feather name="bell" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <Feather name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search exercises..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.muscleFilters}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={muscles}
            keyExtractor={(item) => item || 'all'}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.muscleChip,
                  {
                    backgroundColor: selectedMuscle === item ? colors.primary : colors.card,
                  },
                ]}
                onPress={() => setSelectedMuscle(item)}
              >
                <Text
                  style={[
                    styles.muscleChipText,
                    {
                      color: selectedMuscle === item ? '#FFFFFF' : colors.text,
                    },
                  ]}
                >
                  {item || 'All'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Loading exercises...
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredExercises}
            renderItem={renderExerciseCard}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={loadExercises}
                tintColor={colors.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Feather name="inbox" size={64} color={colors.textSecondary} />
                <Text style={[styles.emptyText, { color: colors.text }]}>
                  No exercises found
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                  Try adjusting your search or filters
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  muscleFilters: {
    marginVertical: 8,
  },
  muscleChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  muscleChipText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 16,
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
  cardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cardContent: {
    padding: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});
