import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Answer = 'A' | 'B' | 'C';

interface Option {
  key: Answer;
  text: string;
}

interface AssessmentQuestionProps {
  title: string;
  question: string;
  options: Option[];
  onAnswer: (answer: Answer) => void;
}

export default function AssessmentQuestion({ title, question, options, onAnswer }: AssessmentQuestionProps) {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionTitle}>{title}</Text>
      <Text style={styles.questionText}>{question}</Text>
      
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.optionButton}
          onPress={() => onAnswer(option.key)}
        >
          <Text style={styles.optionText}>{option.key}) {option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});