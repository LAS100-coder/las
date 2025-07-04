import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Step = 'test' | 'operate' | 'retest' | 'exit' | 'complete';

interface RevisionData {
  topic: string;
  initialScore: string;
  unknownItems: string;
  belief: string;
  visualExample: string;
  definitions: string;
  retestScore: string;
  summary: string;
  nextTopic: string;
}

interface Props {
  currentStep: Step;
  data: RevisionData;
  updateData: (field: keyof RevisionData, value: string) => void;
  onNext: (nextStep: Step) => void;
}

export default function RevisionPlanner({ currentStep, data, updateData, onNext }: Props) {
  const handleNext = () => {
    if (currentStep === 'test') {
      if (!data.topic || !data.initialScore || !data.unknownItems) {
        Alert.alert('Please complete all fields');
        return;
      }
      onNext('operate');
    } else if (currentStep === 'operate') {
      if (!data.belief || !data.visualExample || !data.definitions) {
        Alert.alert('Please complete all strategies');
        return;
      }
      onNext('retest');
    }
  };

  const renderTestStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🔍 Step 1: TEST – What Do You Know?</Text>
      
      <Text style={styles.prompt}>Which subject or topic are you revising right now?</Text>
      <TextInput
        style={styles.input}
        value={data.topic}
        onChangeText={(text) => updateData('topic', text)}
        placeholder="e.g., Photosynthesis or Algebra – Solving Equations"
      />
      
      <Text style={styles.prompt}>Test yourself (or ask someone to test you). What % did you get right?</Text>
      <TextInput
        style={styles.input}
        value={data.initialScore}
        onChangeText={(text) => updateData('initialScore', text)}
        placeholder="e.g., 60%"
        keyboardType="numeric"
      />
      
      <Text style={styles.prompt}>List what you got wrong or didn't know. Focus only on these for now.</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.unknownItems}
        onChangeText={(text) => updateData('unknownItems', text)}
        placeholder="List the topics or questions you struggled with..."
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.saveNote}>✅ These will be saved for the Operate phase.</Text>
    </View>
  );

  const renderOperateStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🔧 Step 2: OPERATE – Fix What You Don't Know</Text>
      <Text style={styles.instructions}>Now work on what you didn't know using the following strategies:</Text>
      
      <Text style={styles.strategyTitle}>✅ Write 1 belief about your ability to learn this</Text>
      <TextInput
        style={styles.input}
        value={data.belief}
        onChangeText={(text) => updateData('belief', text)}
        placeholder="I believe I can master this because..."
      />
      
      <Text style={styles.strategyTitle}>📚 Virtual Read the content</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.visualExample}
        onChangeText={(text) => updateData('visualExample', text)}
        placeholder="Write a short visual + emotional + sound-based example for any concept you struggled with."
        multiline
        numberOfLines={3}
      />
      
      <Text style={styles.strategyTitle}>🔍 Use the Understanding Strategy</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.definitions}
        onChangeText={(text) => updateData('definitions', text)}
        placeholder="List any words or symbols you still don't fully understand and write a definition/example for each."
        multiline
        numberOfLines={3}
      />
    </View>
  );

  return (
    <View>
      {currentStep === 'test' && renderTestStep()}
      {currentStep === 'operate' && renderOperateStep()}
      
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Continue</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { padding: 20 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  instructions: { fontSize: 16, color: '#555', marginBottom: 20, fontStyle: 'italic' },
  prompt: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 15 },
  strategyTitle: { fontSize: 16, fontWeight: '600', color: '#667eea', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff', marginBottom: 10 },
  multilineInput: { height: 80, textAlignVertical: 'top' },
  saveNote: { fontSize: 14, color: '#28a745', fontWeight: '500', marginTop: 10 },
  nextButton: { backgroundColor: '#667eea', margin: 20, padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 }
});