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
  onBackToOperate: () => void;
  onProceedToExit: () => void;
}

export default function RevisionPlannerRetest({ data, updateData, onBackToOperate, onProceedToExit }: Props) {
  const handleNext = () => {
    if (!data.retestScore) {
      Alert.alert('Please enter your retest score');
      return;
    }
    
    const score = parseInt(data.retestScore.replace('%', ''));
    
    if (score < 100) {
      Alert.alert(
        'Great improvement!', 
        'Now go back to the \'Operate\' step and fix the last bit you missed.',
        [{ text: '🔁 Back to Operate', onPress: onBackToOperate }]
      );
    } else {
      Alert.alert(
        'Well done!', 
        'You\'ve mastered this section. Let\'s move to the final step.',
        [{ text: 'Continue', onPress: onProceedToExit }]
      );
    }
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🔄 Step 3: TEST AGAIN – Have You Improved?</Text>
      
      <Text style={styles.prompt}>
        Test yourself again on only the parts you operated on. What % did you get right this time?
      </Text>
      
      <TextInput
        style={styles.input}
        value={data.retestScore}
        onChangeText={(text) => updateData('retestScore', text)}
        placeholder="e.g., 80%"
        keyboardType="numeric"
      />
      
      <View style={styles.logicContainer}>
        <Text style={styles.logicTitle}>📊 Progress Check:</Text>
        <Text style={styles.logicText}>• If less than 100% → Go back to Operate step</Text>
        <Text style={styles.logicText}>• If 100% → Move to final Exit step</Text>
      </View>
      
      <TouchableOpacity style={styles.checkButton} onPress={handleNext}>
        <Text style={styles.checkButtonText}>Check My Progress</Text>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { padding: 20 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  prompt: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff', marginBottom: 20 },
  logicContainer: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#667eea' },
  logicTitle: { fontSize: 16, fontWeight: 'bold', color: '#667eea', marginBottom: 8 },
  logicText: { fontSize: 14, color: '#555', marginBottom: 4 },
  checkButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  checkButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 }
});