import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const FitHubLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.iconWrapper}>
        <View style={styles.dumbbellLeft}>
          <View style={styles.weight} />
          <View style={styles.plate} />
        </View>
        <View style={styles.barbell} />
        <View style={styles.dumbbellRight}>
          <View style={styles.plate} />
          <View style={styles.weight} />
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.logoText}>
          Fit<Text style={styles.logoAccent}>Hub</Text>
        </Text>
        <View style={styles.taglineContainer}>
          <Feather name="zap" size={12} color="#10b981" />
          <Text style={styles.tagline}>Your Fitness Journey</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dumbbellLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dumbbellRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weight: {
    width: 20,
    height: 28,
    backgroundColor: '#10b981',
    borderRadius: 4,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  plate: {
    width: 6,
    height: 32,
    backgroundColor: '#059669',
    borderRadius: 2,
  },
  barbell: {
    width: 60,
    height: 8,
    backgroundColor: '#6b7280',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  textWrapper: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1f2937',
    letterSpacing: -1,
  },
  logoAccent: {
    color: '#10b981',
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  tagline: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
