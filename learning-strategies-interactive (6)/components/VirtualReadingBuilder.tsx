import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface VirtualReadingBuilderProps {
  onComplete: () => void;
}

const VirtualReadingBuilder: React.FC<VirtualReadingBuilderProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(['', '', '', '', '']);
  const [currentResponse, setCurrentResponse] = useState('');

  const steps = [
    {
      title: "See It",
      prompt: "Picture the words in your head. What do you see?"
    },
    {
      title: "Visualise It", 
      prompt: "Turn the words into a mental picture. What do you imagine?"
    },
    {
      title: "Add Sound",
      prompt: "What sound would be part of this scene?"
    },
    {
      title: "Add Emotion",
      prompt: "How would you feel if this happened to you?"
    },
    {
      title: "Describe It",
      prompt: "Now, describe your full scene in one sentence."
    }
  ];

  const handleNext = () => {
    const newResponses = [...responses];
    newResponses[currentStep] = currentResponse;
    setResponses(newResponses);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentResponse(newResponses[currentStep + 1]);
    } else {
      onComplete();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sentence}>"The feline jumped through the window."</Text>
        
        <Text style={styles.instruction}>
          Now follow the five steps below to bring this sentence to life in your mind.
        </Text>

        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>Step {currentStep + 1} of 5</Text>
          <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
          <Text style={styles.prompt}>{steps[currentStep].prompt}</Text>
          
          <TextInput
            style={styles.textInput}
            value={currentResponse}
            onChangeText={setCurrentResponse}
            placeholder="Type your answer here..."
            multiline
            numberOfLines={3}
          />
          
          <TouchableOpacity 
            style={[styles.button, !currentResponse.trim() && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!currentResponse.trim()}
          >
            <Text style={styles.buttonText}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  sentence: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    color: '#1976d2',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  stepContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  prompt: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VirtualReadingBuilder;