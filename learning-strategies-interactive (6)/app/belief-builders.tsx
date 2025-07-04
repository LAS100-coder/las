import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BeliefBuilders from '../components/BeliefBuilders';
import Header from '../components/Header';

export default function BeliefBuildersScreen() {
  const handleComplete = () => {
    router.push('/beliefs-journal');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header title="Belief Builders" />
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>
      <BeliefBuilders onComplete={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start'
  }
});