// User types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Exercise types
export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  image?: string; // Optional image URL
}

export interface ExerciseState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  selectedExercise: Exercise | null;
}

// Favorites types
export interface FavoritesState {
  favorites: Exercise[];
}

// Theme types
export interface ThemeState {
  isDark: boolean;
}

export interface RootState {
  auth: AuthState;
  exercises: ExerciseState;
  favorites: FavoritesState;
  theme: ThemeState;
}
