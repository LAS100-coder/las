import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BeliefBuildersProps {
  onComplete: () => void;
}

export default function BeliefBuilders({ onComplete }: BeliefBuildersProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    affirmation: '',
    pastExperience: '',
    expectation: ''
  });

  const steps = [
    {
      title: 'Your Affirmation',
      key: 'affirmation' as keyof typeof responses,
      example: 'Example: "I learn quickly when I practice"',
      placeholder: 'Write your positive affirmation here...'
    },
    {
      title: 'Your Past Experience',
      key: 'pastExperience' as keyof typeof responses,
      example: 'Example: "I solved two math problems yesterday"',
      placeholder: 'Share a past success or experience...'
    },
    {
      title: 'Your Expectation',
      key: 'expectation' as keyof typeof responses,
      example: 'Example: "By Friday, I\'ll get 75% on my next quiz"',
      placeholder: 'What do you expect to achieve and when?'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(steps.length); // Show completion
    }
  };

  const handleInputChange = (text: string) => {
    const currentKey = steps[currentStep].key;
    setResponses(prev => ({ ...prev, [currentKey]: text }));
  };

  const canProceed = () => {
    if (currentStep >= steps.length) return false;
    const currentKey = steps[currentStep].key;
    return responses[currentKey].trim().length > 0;
  };

  if (currentStep === steps.length) {
    return (
      <View style={styles.container}>
        <View style={styles.completionContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          <Text style={styles.completionTitle}>Great job!</Text>
          <Text style={styles.completionMessage}>Try out the Beliefs Journal for more!</Text>
          <TouchableOpacity style={styles.finishButton} onPress={onComplete}>
            <Text style={styles.finishButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {currentStep === 0 && (
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Your 3 Belief Builders</Text>
          <Text style={styles.introMessage}>Beliefs are built from reasons. Let's build yours!</Text>
        </View>
      )}
      
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
        <Text style={styles.stepNumber}>Step {currentStep + 1} of 3</Text>
        
        <Text style={styles.exampleText}>{steps[currentStep].example}</Text>
        
        <TextInput
          style={styles.input}
          placeholder={steps[currentStep].placeholder}
          value={responses[steps[currentStep].key]}
          onChangeText={handleInputChange}
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity 
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  introContainer: { padding: 20, alignItems: 'center', marginTop: 40 },
  introTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  introMessage: { fontSize: 16, color: '#666', textAlign: 'center' },
  stepContainer: { padding: 20 },
  stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  stepNumber: { fontSize: 14, color: '#666', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#4CAF50', marginBottom: 15, fontStyle: 'italic' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', minHeight: 100, textAlignVertical: 'top', marginBottom: 20 },
  nextButton: { backgroundColor: '#667eea', padding: 15, borderRadius: 8, alignItems: 'center' },
  nextButtonDisabled: { backgroundColor: '#ccc' },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  completionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  completionTitle: { fontSize: 28, fontWeight: 'bold', color: '#4CAF50', marginTop: 20, marginBottom: 10 },
  completionMessage: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  finishButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, paddingHorizontal: 40 },
  finishButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});