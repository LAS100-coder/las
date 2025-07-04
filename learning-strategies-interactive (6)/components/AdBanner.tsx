import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';

type Props = {
  position?: 'top' | 'bottom';
};

export default function AdBanner({ position = 'bottom' }: Props) {
  const { showAds } = useAuth();

  if (!showAds) {
    return null;
  }

  return (
    <View style={[styles.container, position === 'top' ? styles.topAd : styles.bottomAd]}>
      <Text style={styles.adLabel}>Advertisement</Text>
      <View style={styles.adContent}>
        <Text style={styles.adText}>Sample Ad Content</Text>
        <Text style={styles.adSubtext}>This is where Google AdMob ads will appear</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
  topAd: {
    marginBottom: 16,
  },
  bottomAd: {
    marginTop: 16,
  },
  adLabel: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  adContent: {
    backgroundColor: '#e9ecef',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  adText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  adSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});