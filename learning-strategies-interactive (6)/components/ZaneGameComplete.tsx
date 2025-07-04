import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface ZaneGameCompleteProps {
  selectedHabits: string[];
  toggleHabit: (habit: string) => void;
  onNext: () => void;
  onComplete: () => void;
  currentScene: number;
}

export const Scene6 = ({ selectedHabits, toggleHabit, onNext }: ZaneGameCompleteProps) => {
  const habits = [
    'I will create pictures in my mind when reading',
    'I will stop and look up words I don\'t understand', 
    'I will describe what I see or even draw it'
  ];

  return (
    <View style={styles.scene}>
      <Text style={styles.title}>💡 Scene 6: Build the Habit</Text>
      <Text style={styles.narration}>
        Zane learned something big: "If I picture it, I understand better!"
      </Text>
      <Text style={styles.instruction}>
        Which habits will you try from now on?
      </Text>
      
      {habits.map((habit, index) => (
        <TouchableOpacity 
          key={index}
          style={[
            styles.habitButton,
            selectedHabits.includes(habit) && styles.selectedHabit
          ]}
          onPress={() => toggleHabit(habit)}
        >
          <Text style={[
            styles.habitText,
            selectedHabits.includes(habit) && styles.selectedHabitText
          ]}>
            {selectedHabits.includes(habit) ? '✅' : '☐'} {habit}
          </Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        style={[styles.button, selectedHabits.length === 0 && styles.disabledButton]} 
        onPress={onNext}
        disabled={selectedHabits.length === 0}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CompletionScreen = ({ onComplete }: ZaneGameCompleteProps) => (
  <ScrollView style={styles.scene}>
    <View style={styles.completionContainer}>
      <Text style={styles.badge}>🏅</Text>
      <Text style={styles.completionTitle}>Conceptualising Champ!</Text>
      <Text style={styles.completionText}>
        Congratulations! You've completed Zane's adventure and learned the important skill of conceptualising when you read.
      </Text>
      <Text style={styles.completionText}>
        Remember: Always create pictures in your mind when reading to improve your understanding and memory!
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onComplete}>
          <Text style={styles.buttonText}>Back to Module</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Try Technical Reading Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scene: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  narration: { fontSize: 16, color: '#555', marginBottom: 15, lineHeight: 22 },
  instruction: { fontSize: 14, color: '#666', marginBottom: 20, fontStyle: 'italic' },
  habitButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  selectedHabit: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff'
  },
  habitText: {
    fontSize: 14,
    color: '#333'
  },
  selectedHabitText: {
    color: '#667eea',
    fontWeight: '600'
  },
  button: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  completionContainer: {
    alignItems: 'center',
    paddingVertical: 40
  },
  badge: {
    fontSize: 80,
    marginBottom: 20
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  completionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30
  },
  primaryButton: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea'
  },
  secondaryButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600'
  }
});