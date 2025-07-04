import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface WordBuilderStepProps {
  stepNumber: number;
  title: string;
  prompt: string;
  tip?: string;
  value: string;
  onValueChange: (value: string) => void;
  onNext: () => void;
  isLastStep?: boolean;
}

export default function WordBuilderStep({
  stepNumber,
  title,
  prompt,
  tip,
  value,
  onValueChange,
  onNext,
  isLastStep = false
}: WordBuilderStepProps) {
  const getStepEmoji = (step: number) => {
    const emojis = ['🟢', '📘', '🟡', '🧠', '🔊', '❤️', '🔤', '🔈'];
    return emojis[step - 1] || '🔹';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>
          {getStepEmoji(stepNumber)} Step {stepNumber}: {title}
        </Text>
      </View>
      
      <Text style={styles.prompt}>{prompt}</Text>
      
      {tip && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipLabel}>💡 Tip:</Text>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      )}
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onValueChange}
        placeholder="Type your answer here..."
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
      
      <TouchableOpacity 
        style={[styles.button, !value.trim() && styles.buttonDisabled]} 
        onPress={onNext}
        disabled={!value.trim()}
      >
        <Text style={styles.buttonText}>
          {isLastStep ? 'Complete' : 'Next Step'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  stepIndicator: { fontSize: 18, fontWeight: 'bold', color: '#667eea' },
  prompt: { fontSize: 16, color: '#333', marginBottom: 15, lineHeight: 24 },
  tipContainer: { backgroundColor: '#f0f8ff', padding: 12, borderRadius: 8, marginBottom: 15 },
  tipLabel: { fontSize: 14, fontWeight: '600', color: '#667eea' },
  tipText: { fontSize: 14, color: '#555', marginTop: 4 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, minHeight: 80, marginBottom: 20 },
  button: { backgroundColor: '#667eea', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});