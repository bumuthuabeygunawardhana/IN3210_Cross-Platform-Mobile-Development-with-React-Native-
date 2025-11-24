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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchExercises } from '@/store/slices/exerciseSlice';
import { toggleFavorite, saveFavorites } from '@/store/slices/favoritesSlice';
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
  const [waterIntake, setWaterIntake] = useState(0);
  const waterGoal = 8; // 8 glasses per day

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

  const handleToggleFavorite = async (exercise: Exercise, event: any) => {
    event.stopPropagation(); // Prevent card press when clicking favorite
    dispatch(toggleFavorite(exercise));
    const isFav = isFavorite(exercise.name);
    const updatedFavorites = isFav 
      ? favorites.filter(fav => fav.name !== exercise.name)
      : [...favorites, exercise];
    await dispatch(saveFavorites(updatedFavorites));
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
            onPress={(e) => handleToggleFavorite(item, e)}
            activeOpacity={0.7}
          >
            <Feather 
              name="heart" 
              size={24} 
              color={isFavorite(item.name) ? '#F44336' : '#FFFFFF'}
              fill={isFavorite(item.name) ? '#F44336' : 'none'}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.cardHeader, { backgroundColor: colors.primary + '20' }]}>
          <Feather name="activity" size={40} color={colors.primary} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => handleToggleFavorite(item, e)}
            activeOpacity={0.7}
          >
            <Feather 
              name="heart" 
              size={24} 
              color={isFavorite(item.name) ? '#F44336' : colors.textSecondary}
              fill={isFavorite(item.name) ? '#F44336' : 'none'}
            />
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

        <View style={[styles.descriptionContainer, { backgroundColor: colors.background }]}>
          <View style={styles.descriptionHeader}>
            <Feather name="info" size={14} color={colors.primary} />
            <Text style={[styles.descriptionLabel, { color: colors.primary }]}>
              Description
            </Text>
          </View>
          <Text style={[styles.cardDescription, { color: colors.textSecondary }]} numberOfLines={3}>
            {item.instructions}
          </Text>
          <Text style={[styles.readMore, { color: colors.primary }]}>
            Tap to read more →
          </Text>
        </View>

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
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome to FitHub</Text>
          <Text style={[styles.username, { color: colors.text }]}>Hey, {user?.name || 'Athlete'}! 💪</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Feather name="bell" size={24} color={colors.text} />
        </TouchableOpacity>
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
          ListHeaderComponent={
            <>
              {/* Water Intake Section */}
              <View style={[styles.waterCard, { backgroundColor: colors.card }]}>
                <View style={styles.waterHeader}>
                  <View style={styles.waterTitleRow}>
                    <Feather name="droplet" size={24} color="#2196F3" />
                    <Text style={[styles.waterTitle, { color: colors.text }]}>Daily Water Intake</Text>
                  </View>
                  <Text style={[styles.waterGoal, { color: colors.textSecondary }]}>
                    {waterIntake} / {waterGoal} glasses
                  </Text>
                </View>
                
                <View style={styles.waterProgress}>
                  <View style={styles.waterProgressBar}>
                    <View 
                      style={[
                        styles.waterProgressFill, 
                        { width: `${Math.min((waterIntake / waterGoal) * 100, 100)}%` }
                      ]} 
                    />
                  </View>
                </View>

                <View style={styles.waterButtons}>
                  <TouchableOpacity 
                    style={[styles.waterButton, { backgroundColor: '#2196F3' }]}
                    onPress={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                    disabled={waterIntake === 0}
                  >
                    <Feather name="minus" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.waterButton, { backgroundColor: '#2196F3' }]}
                    onPress={() => setWaterIntake(Math.min(waterGoal, waterIntake + 1))}
                    disabled={waterIntake >= waterGoal}
                  >
                    <Feather name="plus" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {waterIntake >= waterGoal && (
                  <View style={styles.waterAchievement}>
                    <Feather name="check-circle" size={16} color="#4CAF50" />
                    <Text style={[styles.waterAchievementText, { color: '#4CAF50' }]}>
                      Great job! Goal achieved! 🎉
                    </Text>
                  </View>
                )}
              </View>

              {/* Wellness Tips Section */}
              <View style={[styles.tipsCard, { backgroundColor: colors.card }]}>
                <View style={styles.tipsHeader}>
                  <Feather name="heart" size={24} color="#FF6B6B" />
                  <Text style={[styles.tipsTitle, { color: colors.text }]}>Wellness Tips</Text>
                </View>
                
                <View style={styles.tipsList}>
                  <View style={styles.tipItem}>
                    <Feather name="sun" size={18} color="#FFA726" />
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                      Get 7-9 hours of quality sleep each night
                    </Text>
                  </View>
                  
                  <View style={styles.tipItem}>
                    <Feather name="activity" size={18} color="#4CAF50" />
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                      Stay active with at least 30 minutes of exercise daily
                    </Text>
                  </View>
                  
                  <View style={styles.tipItem}>
                    <Feather name="coffee" size={18} color="#8B4513" />
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                      Eat balanced meals with protein, carbs, and healthy fats
                    </Text>
                  </View>

                  <View style={styles.tipItem}>
                    <Feather name="smile" size={18} color="#FF6B6B" />
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                      Take breaks to stretch and relax your mind
                    </Text>
                  </View>
                </View>
              </View>

              {/* Search and Filters */}
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
            </>
          }
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
  );
}const styles = StyleSheet.create({
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
    marginHorizontal: 16,
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
    paddingHorizontal: 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
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
  descriptionContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  readMore: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
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
  // Water Intake Styles
  waterCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  waterHeader: {
    marginBottom: 16,
  },
  waterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  waterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  waterGoal: {
    fontSize: 14,
  },
  waterProgress: {
    marginBottom: 16,
  },
  waterProgressBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  waterProgressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  waterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  waterAchievement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  waterAchievementText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  // Wellness Tips Styles
  tipsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
