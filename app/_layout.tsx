import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import { store, useAppSelector } from '@/store';
import { loadStoredAuth } from '@/store/slices/authSlice';
import { loadFavorites } from '@/store/slices/favoritesSlice';
import { loadTheme } from '@/store/slices/themeSlice';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isDark = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    // Load stored data on app start
    store.dispatch(loadStoredAuth());
    store.dispatch(loadFavorites());
    store.dispatch(loadTheme());
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/login');
    } else if (isAuthenticated && !inAuthGroup) {
      // Redirect to home if authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="exercise-details" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
