import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

interface SceneProps {
  onChoice: (choice: string, isCorrect: boolean) => void;
  onNext: () => void;
  userInput?: string;
  setUserInput?: (text: string) => void;
  selectedHabits?: string[];
  toggleHabit?: (habit: string) => void;
}

export const Scene3 = ({ onChoice, onNext, userInput, setUserInput }: SceneProps) => (
  <View style={styles.scene}>
    <Text style={styles.title}>✏️ Scene 3: Describe the Picture</Text>
    <Text style={styles.narration}>
      Zane adds detail to the image in his mind.
    </Text>
    <Text style={styles.instruction}>Choose a detailed sentence or write your own:</Text>
    
    <TouchableOpacity 
      style={styles.choiceButton} 
      onPress={() => onChoice('detailed', true)}
    >
      <Text style={styles.choiceText}>"A small black cat leapt through a classroom window with fluttering curtains."</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={styles.choiceButton} 
      onPress={() => onChoice('wrong', false)}
    >
      <Text style={styles.choiceText}>"A wild cheetah smashed through a glass wall."</Text>
    </TouchableOpacity>
    
    <Text style={styles.orText}>OR</Text>
    
    <TextInput
      style={styles.textInput}
      placeholder="Describe what you see in your mind..."
      value={userInput}
      onChangeText={setUserInput}
      multiline
    />
    
    <TouchableOpacity style={styles.button} onPress={onNext}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  scene: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  narration: { fontSize: 16, color: '#555', marginBottom: 15, lineHeight: 22 },
  instruction: { fontSize: 14, color: '#666', marginBottom: 20, fontStyle: 'italic' },
  button: { backgroundColor: '#667eea', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  choiceButton: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  choiceText: { fontSize: 14, color: '#333' },
  orText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginVertical: 15, color: '#666' },
  textInput: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', minHeight: 80, textAlignVertical: 'top' }
});