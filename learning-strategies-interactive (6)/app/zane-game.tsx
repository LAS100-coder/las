import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ZaneGame from '../components/ZaneGame';

export default function ZaneGameScreen() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameComplete = () => {
    router.back();
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (gameStarted) {
    return <ZaneGame onComplete={handleGameComplete} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zane's Adventure</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        <Text style={styles.title}>🎮 Zane and the Mystery in Class 4B</Text>
        <Text style={styles.subtitle}>A Conceptualising Practice Activity</Text>
        
        <View style={styles.objectiveBox}>
          <Text style={styles.objectiveTitle}>🧠 Learning Objective:</Text>
          <Text style={styles.objectiveText}>
            Help students understand and practice the skill of conceptualising what they read by following Zane's story and completing interactive comprehension tasks.
          </Text>
        </View>
        
        <View style={styles.featuresBox}>
          <Text style={styles.featuresTitle}>What you'll do:</Text>
          <Text style={styles.feature}>• Follow Zane through 6 interactive scenes</Text>
          <Text style={styles.feature}>• Practice reading with understanding</Text>
          <Text style={styles.feature}>• Learn to create mental pictures</Text>
          <Text style={styles.feature}>• Build good reading habits</Text>
        </View>
        
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start Zane's Adventure</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    backgroundColor: '#667eea', 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scrollContainer: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  objectiveBox: { 
    backgroundColor: '#e8f4fd', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#667eea'
  },
  objectiveTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  objectiveText: { fontSize: 14, color: '#555', lineHeight: 20 },
  featuresBox: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  featuresTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  feature: { fontSize: 14, color: '#555', marginBottom: 8, lineHeight: 20 },
  startButton: { 
    backgroundColor: '#667eea', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});