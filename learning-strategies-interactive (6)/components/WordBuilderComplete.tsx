import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface WordBuilderCompleteProps {
  word: string;
  responses: string[];
  onRestart: () => void;
  onClose: () => void;
}

export default function WordBuilderComplete({
  word,
  responses,
  onRestart,
  onClose
}: WordBuilderCompleteProps) {
  const stepTitles = [
    'Word Identification',
    'Get the Meaning',
    'Create an Example',
    'Visualise the Example',
    'Add a Sound',
    'Add Emotion',
    'See the Word in the Scene',
    'Hear the Word in the Scene'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎉 Well Done!</Text>
        <Text style={styles.subtitle}>
          You've just used the 8-step strategy to fully understand and remember a new word.
        </Text>
      </View>
      
      <ScrollView style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Your Word Journey: "{word}"</Text>
        
        {responses.map((response, index) => (
          <View key={index} style={styles.summaryItem}>
            <Text style={styles.summaryStepTitle}>
              Step {index + 1}: {stepTitles[index]}
            </Text>
            <Text style={styles.summaryResponse}>{response}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Text style={styles.restartButtonText}>Try Another Word</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Back to Module</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#667eea', padding: 20, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 22 },
  summaryContainer: { flex: 1, padding: 20 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  summaryItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 1 },
  summaryStepTitle: { fontSize: 14, fontWeight: '600', color: '#667eea', marginBottom: 5 },
  summaryResponse: { fontSize: 14, color: '#333', lineHeight: 20 },
  buttonContainer: { padding: 20, gap: 10 },
  restartButton: { backgroundColor: '#667eea', padding: 15, borderRadius: 8, alignItems: 'center' },
  restartButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  closeButton: { backgroundColor: '#fff', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#667eea' },
  closeButtonText: { color: '#667eea', fontSize: 16, fontWeight: '600' }
});