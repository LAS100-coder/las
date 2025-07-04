import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Header from './Header';
import { supabase } from '../app/lib/supabase';
import { useAuth } from './AuthContext';

const strategySteps = [
  { key: 'identify', label: '🧩 Identify the tricky word/term/symbol' },
  { key: 'context', label: '📖 What does it mean in this context?' },
  { key: 'example', label: '📝 Create your own example' },
  { key: 'picture', label: '👀 Picture it in your mind' },
  { key: 'sounds', label: '🔊 Add sounds to your example' },
  { key: 'emotions', label: '💥 Add strong emotions' },
  { key: 'visual', label: '🔠 See the word in your example' },
  { key: 'audio', label: '🗣️ Hear the word in your example' }
];

export default function VocabWordDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStrategy, setShowStrategy] = useState(false);
  const [strategyData, setStrategyData] = useState({});

  useEffect(() => {
    loadWord();
  }, [id]);

  const loadWord = async () => {
    if (!user || !id) return;
    
    try {
      const { data, error } = await supabase
        .from('vocab_words')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      setWord(data);
      setStrategyData(data.strategy_data || {});
    } catch (error) {
      Alert.alert('Error', 'Failed to load word details');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const updateStrategyData = (key, value) => {
    setStrategyData(prev => ({ ...prev, [key]: value }));
  };

  const saveStrategy = async () => {
    if (!word) return;
    
    try {
      const completedSteps = Object.keys(strategyData).filter(key => strategyData[key]?.trim()).length;
      const isCompleted = completedSteps === strategySteps.length;
      
      const { error } = await supabase
        .from('vocab_words')
        .update({
          strategy_data: strategyData,
          strategy_completed: isCompleted
        })
        .eq('id', word.id);

      if (error) throw error;
      Alert.alert('Success', 'Understanding strategy saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save strategy');
    }
  };

  if (loading || !word) {
    return (
      <View style={styles.container}>
        <Header title="Word Details" showBack />
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  const completedSteps = Object.keys(strategyData).filter(key => strategyData[key]?.trim()).length;

  return (
    <View style={styles.container}>
      <Header title={word.word} showBack />
      
      <ScrollView style={styles.content}>
        <View style={styles.wordInfo}>
          <Text style={styles.wordTitle}>{word.word}</Text>
          <Text style={styles.wordMeaning}>{word.meaning}</Text>
          
          {word.sentence && <Text style={styles.sentence}>Sentence: {word.sentence}</Text>}
          {word.tag && <Text style={styles.tag}>{word.tag}</Text>}
          
          <Text style={styles.status}>
            Understanding: {word.understood ? '✅ Yes' : '❌ Not Yet'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.strategyHeader}
          onPress={() => setShowStrategy(!showStrategy)}
        >
          <Text style={styles.strategyTitle}>🧠 Make the Word Stick – Understanding Strategy</Text>
          <Text>{showStrategy ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.progress}>{completedSteps}/{strategySteps.length} steps completed</Text>
        
        {showStrategy && (
          <View style={styles.strategySteps}>
            {strategySteps.map((step, index) => (
              <View key={step.key} style={styles.step}>
                <Text style={styles.stepLabel}>{index + 1}. {step.label}</Text>
                {step.key === 'identify' ? (
                  <Text style={styles.autoFilled}>{word.word}</Text>
                ) : (
                  <TextInput
                    style={styles.stepInput}
                    value={strategyData[step.key] || ''}
                    onChangeText={(value) => updateStrategyData(step.key, value)}
                    placeholder={`Enter your ${step.label.toLowerCase()}...`}
                    multiline
                  />
                )}
              </View>
            ))}
            
            <TouchableOpacity style={styles.saveButton} onPress={saveStrategy}>
              <Text style={styles.saveButtonText}>Save Strategy</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 20 },
  loading: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  wordInfo: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 20 },
  wordTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  wordMeaning: { fontSize: 16, color: '#666', marginBottom: 8 },
  sentence: { fontSize: 14, marginBottom: 8 },
  tag: { fontSize: 12, backgroundColor: '#E8F5E8', padding: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  status: { fontSize: 14, fontWeight: '600' },
  strategyHeader: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 10 },
  strategyTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  progress: { fontSize: 14, color: '#666', marginBottom: 20 },
  strategySteps: { gap: 16 },
  step: { backgroundColor: 'white', padding: 16, borderRadius: 12 },
  stepLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  stepInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, minHeight: 60, textAlignVertical: 'top' },
  autoFilled: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, fontStyle: 'italic' },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});