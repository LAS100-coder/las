import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  data: RevisionData;
  updateData: (field: keyof RevisionData, value: string) => void;
  onComplete: () => void;
}

export default function RevisionPlannerExit({ data, updateData, onComplete }: Props) {
  const handleComplete = () => {
    if (!data.summary || !data.nextTopic) {
      Alert.alert('Please complete both fields to finish');
      return;
    }
    onComplete();
  };

  const handleSetReminder = () => {
    Alert.alert(
      'Reminder Set! 🔔',
      `We'll remind you to revise "${data.nextTopic}" tomorrow at 9:00 AM.`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🚀 Step 4: EXIT – Move Forward with Confidence</Text>
      
      <Text style={styles.prompt}>Summarise what you just mastered.</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={data.summary}
        onChangeText={(text) => updateData('summary', text)}
        placeholder="Write a summary of what you've learned and mastered..."
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.prompt}>What's the next section you'll revise tomorrow?</Text>
      <TextInput
        style={styles.input}
        value={data.nextTopic}
        onChangeText={(text) => updateData('nextTopic', text)}
        placeholder="e.g., Chemical Reactions or Quadratic Equations"
      />
      
      <TouchableOpacity style={styles.reminderButton} onPress={handleSetReminder}>
        <Ionicons name="notifications" size={20} color="#667eea" />
        <Text style={styles.reminderButtonText}>Set Daily Revision Reminder</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>Complete Revision Cycle</Text>
        <Ionicons name="checkmark-done" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { padding: 20 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  prompt: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff', marginBottom: 15 },
  multilineInput: { height: 100, textAlignVertical: 'top' },
  reminderButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8f4fd', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#667eea' },
  reminderButtonText: { color: '#667eea', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  completeButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  completeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 }
});