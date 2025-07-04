import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SpellingGame from '../components/SpellingGame';

export default function SpellingGameScreen() {
  const [gameMode, setGameMode] = useState<'menu' | 'single' | 'multiplayer'>('menu');

  const renderMenu = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spelling Challenge</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🎮 Spelling Challenge</Text>
        <Text style={styles.subtitle}>Train your brain to see words in your mind and spell them correctly!</Text>
        
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>🧠 Visual Trick!</Text>
          <Text style={styles.tipText}>
            Picture the word in your mind like it's on a whiteboard with black letters.
            Make sure you can see all the letters at once clearly!
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.modeButton} 
            onPress={() => setGameMode('single')}
          >
            <Text style={styles.modeButtonText}>🎯 Single Player</Text>
            <Text style={styles.modeDescription}>Practice on your own</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.modeButton, styles.multiplayerButton]} 
            onPress={() => setGameMode('multiplayer')}
          >
            <Text style={styles.modeButtonText}>👥 Two Players</Text>
            <Text style={styles.modeDescription}>Challenge a friend</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🎯 What You Learn</Text>
          <Text style={styles.infoText}>• Seeing memory</Text>
          <Text style={styles.infoText}>• Spelling accuracy</Text>
          <Text style={styles.infoText}>• Focus and concentration</Text>
          <Text style={styles.infoText}>• Confidence!</Text>
        </View>
      </ScrollView>
    </View>
  );

  if (gameMode === 'single') {
    return (
      <View style={styles.gameContainer}>
        <SpellingGame 
          isMultiplayer={false} 
          onExit={() => setGameMode('menu')} 
        />
      </View>
    );
  }

  if (gameMode === 'multiplayer') {
    return (
      <View style={styles.gameContainer}>
        <SpellingGame 
          isMultiplayer={true} 
          onExit={() => setGameMode('menu')} 
        />
      </View>
    );
  }

  return renderMenu();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#667eea',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  tipBox: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  modeButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, y: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  multiplayerButton: {
    borderColor: '#FF6B6B',
    borderWidth: 3,
  },
  modeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f0f8f0',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});