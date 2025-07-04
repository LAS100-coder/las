import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ToteActivity from '../components/ToteActivity';

export default function ToteActivityScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ToteActivity />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1
  },
  backButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.8)',
    padding: 8,
    borderRadius: 20
  }
});