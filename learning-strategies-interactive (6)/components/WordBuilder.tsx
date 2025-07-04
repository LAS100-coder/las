import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import WordBuilderStep from './WordBuilderStep';
import WordBuilderComplete from './WordBuilderComplete';

const steps = [
  {
    title: 'Word Identification',
    prompt: 'Enter a word, term, symbol, or abbreviation you don\'t fully understand.'
  },
  {
    title: 'Get the Meaning',
    prompt: 'What is the meaning or definition of this word in the subject you\'re studying?',
    tip: 'Use a subject-specific source, like a textbook, teacher, AI, or trusted website.'
  },
  {
    title: 'Create an Example',
    prompt: 'What\'s a personal or visual example that helps make this word clear to you?',
    tip: 'Choose something interesting or memorable — like a lion, house cat, or cartoon character.'
  },
  {
    title: 'Visualise the Example',
    prompt: 'Close your eyes and picture the example clearly. Now describe what you see.'
  },
  {
    title: 'Add a Sound',
    prompt: 'Add a sound to your mental picture. What do you hear in the scene?'
  },
  {
    title: 'Add Emotion',
    prompt: 'How do you feel in the scene? Add a strong emotion to help you remember.'
  },
  {
    title: 'See the Word in the Scene',
    prompt: 'Now imagine the word itself written somewhere in your scene. Where do you see it?'
  },
  {
    title: 'Hear the Word in the Scene',
    prompt: 'Finally, imagine someone saying the word out loud in your example. What does it sound like?'
  }
];

export default function WordBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(new Array(8).fill(''));
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setResponses(new Array(8).fill(''));
    setIsComplete(false);
  };

  const handleClose = () => {
    router.back();
  };

  const updateResponse = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentStep] = value;
    setResponses(newResponses);
  };

  if (isComplete) {
    return (
      <WordBuilderComplete
        word={responses[0]}
        responses={responses}
        onRestart={handleRestart}
        onClose={handleClose}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>🧠 Understand Any Word: 8-Step Builder</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step {currentStep + 1} of {steps.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentStep + 1) / steps.length) * 100}%` }]} />
        </View>
      </View>
      
      <WordBuilderStep
        stepNumber={currentStep + 1}
        title={steps[currentStep].title}
        prompt={steps[currentStep].prompt}
        tip={steps[currentStep].tip}
        value={responses[currentStep]}
        onValueChange={updateResponse}
        onNext={handleNext}
        isLastStep={currentStep === steps.length - 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#667eea', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 15 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff', flex: 1 },
  progressContainer: { padding: 20, backgroundColor: '#fff' },
  progressText: { fontSize: 14, color: '#666', marginBottom: 8, textAlign: 'center' },
  progressBar: { height: 6, backgroundColor: '#e0e0e0', borderRadius: 3 },
  progressFill: { height: '100%', backgroundColor: '#667eea', borderRadius: 3 }
});