import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToteData {
  topic: string;
  initialScore: string;
  unknownAreas: string;
  belief: string;
  virtualExample: string;
  definitions: string;
  retestScore: string;
  summary: string;
  nextTopic: string;
}

export default function ToteActivity() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<ToteData>({
    topic: '',
    initialScore: '',
    unknownAreas: '',
    belief: '',
    virtualExample: '',
    definitions: '',
    retestScore: '',
    summary: '',
    nextTopic: ''
  });

  const updateData = (field: keyof ToteData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep === 3) {
      const score = parseInt(data.retestScore);
      if (score < 100) {
        Alert.alert(
          'Great improvement!',
          'Now go back to the Operate step and fix the last bit you missed.',
          [{ text: 'Back to Operate', onPress: () => setCurrentStep(2) }]
        );
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🎯 Step 1: TEST – What Do You Know?</Text>
      
      <Text style={styles.prompt}>Which subject or topic are you revising right now?</Text>
      <TextInput
        style={styles.input}
        value={data.topic}
        onChangeText={(text) => updateData('topic', text)}
        placeholder="e.g., Photosynthesis or Algebra – Solving Equations"
        multiline
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
        value={data.unknownAreas}
        onChangeText={(text) => updateData('unknownAreas', text)}
        placeholder="List the topics or questions you got wrong..."
        multiline
        numberOfLines={4}
      />
      
      <TouchableOpacity 
        style={[styles.nextButton, (!data.topic || !data.initialScore || !data.unknownAreas) && styles.disabledButton]} 
        onPress={nextStep}
        disabled={!data.topic || !data.initialScore || !data.unknownAreas}
      >
        <Text style={styles.buttonText}>Continue to Operate</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>⚙️ Step 2: OPERATE – Fix What You Don't Know</Text>
      <Text style={styles.instruction}>Now work on what you didn't know using the following strategies:</Text>
      
      <Text style={styles.strategyTitle}>✅ Write 1 belief about your ability to learn this</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.belief}
        onChangeText={(text) => updateData('belief', text)}
        placeholder="I believe I can master this because..."
        multiline
        numberOfLines={3}
      />
      
      <Text style={styles.strategyTitle}>📚 Virtual Read the content</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.virtualExample}
        onChangeText={(text) => updateData('virtualExample', text)}
        placeholder="Write a short visual + emotional + sound-based example for any concept you struggled with."
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.strategyTitle}>🔍 Use the Understanding Strategy</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.definitions}
        onChangeText={(text) => updateData('definitions', text)}
        placeholder="List any words or symbols you still don't fully understand and write a definition/example for each."
        multiline
        numberOfLines={4}
      />
      
      <TouchableOpacity 
        style={[styles.nextButton, (!data.belief || !data.virtualExample || !data.definitions) && styles.disabledButton]} 
        onPress={nextStep}
        disabled={!data.belief || !data.virtualExample || !data.definitions}
      >
        <Text style={styles.buttonText}>Ready to Test Again</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🔄 Step 3: TEST AGAIN – Have You Improved?</Text>
      
      <Text style={styles.prompt}>Test yourself again on only the parts you operated on. What % did you get right this time?</Text>
      <TextInput
        style={styles.input}
        value={data.retestScore}
        onChangeText={(text) => updateData('retestScore', text)}
        placeholder="e.g., 80%"
        keyboardType="numeric"
      />
      
      <TouchableOpacity 
        style={[styles.nextButton, !data.retestScore && styles.disabledButton]} 
        onPress={nextStep}
        disabled={!data.retestScore}
      >
        <Text style={styles.buttonText}>Check Progress</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🚀 Step 4: EXIT – Move Forward with Confidence</Text>
      
      <Text style={styles.prompt}>Summarise what you just mastered.</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.summary}
        onChangeText={(text) => updateData('summary', text)}
        placeholder="Describe what you've learned and mastered..."
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.prompt}>What's the next section you'll revise tomorrow?</Text>
      <TextInput
        style={styles.input}
        value={data.nextTopic}
        onChangeText={(text) => updateData('nextTopic', text)}
        placeholder="Next topic to study..."
      />
      
      <TouchableOpacity 
        style={[styles.nextButton, (!data.summary || !data.nextTopic) && styles.disabledButton]} 
        onPress={nextStep}
        disabled={!data.summary || !data.nextTopic}
      >
        <Text style={styles.buttonText}>Complete T.O.T.E Cycle</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCompletion = () => (
    <View style={styles.completionContainer}>
      <Text style={styles.completionTitle}>🎉 Congratulations!</Text>
      <Text style={styles.completionText}>
        You just completed a full revision cycle — the smart way! With this method, your memory, confidence, and marks will all grow.
      </Text>
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Your T.O.T.E Summary:</Text>
        <Text style={styles.summaryItem}>📚 Topic: {data.topic}</Text>
        <Text style={styles.summaryItem}>📈 Progress: {data.initialScore} → {data.retestScore}</Text>
        <Text style={styles.summaryItem}>🎯 Next: {data.nextTopic}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.restartButton}
        onPress={() => {
          setCurrentStep(1);
          setData({
            topic: '',
            initialScore: '',
            unknownAreas: '',
            belief: '',
            virtualExample: '',
            definitions: '',
            retestScore: '',
            summary: '',
            nextTopic: ''
          });
        }}
      >
        <Text style={styles.buttonText}>Start New T.O.T.E Cycle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Revise Like a Pro: T.O.T.E Strategy</Text>
        <Text style={styles.subtitle}>Step {currentStep} of 4</Text>
      </View>
      
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(currentStep / 4) * 100}%` }]} />
      </View>
      
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderCompletion()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#667eea', padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#fff', textAlign: 'center', marginTop: 5 },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', margin: 20 },
  progress: { height: '100%', backgroundColor: '#667eea', borderRadius: 2 },
  stepContainer: { padding: 20 },
  stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  instruction: { fontSize: 16, color: '#555', marginBottom: 15 },
  prompt: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10, marginTop: 15 },
  strategyTitle: { fontSize: 16, fontWeight: '600', color: '#667eea', marginBottom: 10, marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff', marginBottom: 15 },
  multilineInput: { minHeight: 80, textAlignVertical: 'top' },
  nextButton: { backgroundColor: '#667eea', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  completionContainer: { padding: 20, alignItems: 'center' },
  completionTitle: { fontSize: 28, fontWeight: 'bold', color: '#667eea', marginBottom: 20 },
  completionText: { fontSize: 16, color: '#333', textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  summaryBox: { backgroundColor: '#e8f4fd', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#667eea', marginBottom: 15 },
  summaryItem: { fontSize: 14, color: '#333', marginBottom: 8 },
  restartButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', width: '100%' }
});