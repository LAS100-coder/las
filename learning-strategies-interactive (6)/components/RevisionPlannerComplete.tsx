import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface RevisionData {
  topic: string;
  initialScore: string;
  retestScore: string;
  summary: string;
  nextTopic: string;
}

interface Props {
  data: RevisionData;
  onRestart: () => void;
}

export default function RevisionPlannerComplete({ data, onRestart }: Props) {
  const improvement = parseInt(data.retestScore.replace('%', '')) - parseInt(data.initialScore.replace('%', ''));
  
  return (
    <View style={styles.container}>
      <View style={styles.celebrationHeader}>
        <Text style={styles.celebrationEmoji}>🎉</Text>
        <Text style={styles.celebrationTitle}>Revision Cycle Complete!</Text>
        <Text style={styles.celebrationSubtitle}>
          You just completed a full revision cycle — the smart way!
        </Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>📊 Your Progress Summary</Text>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Topic Mastered:</Text>
          <Text style={styles.progressValue}>{data.topic}</Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Score Improvement:</Text>
          <Text style={styles.progressValue}>
            {data.initialScore} → {data.retestScore} (+{improvement}%)
          </Text>
        </View>
        
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Next Topic:</Text>
          <Text style={styles.progressValue}>{data.nextTopic}</Text>
        </View>
      </View>
      
      <View style={styles.messageContainer}>
        <Text style={styles.finalMessage}>
          With this method, your memory, confidence, and marks will all grow.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Ionicons name="refresh" size={20} color="#667eea" />
          <Text style={styles.restartButtonText}>Start Another Topic</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
          <Ionicons name="home" size={20} color="#fff" />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  celebrationHeader: { alignItems: 'center', marginBottom: 30, marginTop: 40 },
  celebrationEmoji: { fontSize: 60, marginBottom: 15 },
  celebrationTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
  celebrationSubtitle: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 22 },
  summaryContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, y: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  progressItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  progressLabel: { fontSize: 14, color: '#666', flex: 1 },
  progressValue: { fontSize: 14, fontWeight: '600', color: '#333', flex: 1, textAlign: 'right' },
  messageContainer: { backgroundColor: '#e8f4fd', padding: 20, borderRadius: 12, marginBottom: 30, borderWidth: 2, borderColor: '#667eea' },
  finalMessage: { fontSize: 16, color: '#333', textAlign: 'center', lineHeight: 22, fontWeight: '500' },
  buttonContainer: { gap: 15 },
  restartButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8f4fd', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#667eea' },
  restartButtonText: { color: '#667eea', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  homeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#667eea', padding: 15, borderRadius: 8 },
  homeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});