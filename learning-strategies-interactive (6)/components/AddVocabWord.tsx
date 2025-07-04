import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from './Header';
import { supabase } from '../app/lib/supabase';
import { useAuth } from './AuthContext';

export default function AddVocabWord() {
  const { user } = useAuth();
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');
  const [tag, setTag] = useState('');
  const [understood, setUnderstood] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      Alert.alert('Error', 'Please log in to save words');
      return;
    }

    if (!word.trim() || !meaning.trim()) {
      Alert.alert('Error', 'Please fill in both word and meaning fields');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('vocab_words')
        .insert({
          user_id: user.id,
          word: word.trim(),
          meaning: meaning.trim(),
          sentence: sentence.trim(),
          tag: tag.trim(),
          understood,
          strategy_completed: false
        });

      if (error) throw error;

      Alert.alert('Success', 'Word added to your vocabulary journal!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving word:', error);
      Alert.alert('Error', 'Failed to save word. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add New Word" showBack />
      
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Word *</Text>
            <TextInput
              style={styles.input}
              value={word}
              onChangeText={setWord}
              placeholder="e.g., osmosis"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Meaning *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={meaning}
              onChangeText={setMeaning}
              placeholder="e.g., The movement of water across a membrane"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Used in a Sentence</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={sentence}
              onChangeText={setSentence}
              placeholder="e.g., Water moves into the plant by osmosis."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tag/Subject</Text>
            <TextInput
              style={styles.input}
              value={tag}
              onChangeText={setTag}
              placeholder="e.g., Biology"
            />
          </View>

          <View style={styles.switchField}>
            <Text style={styles.label}>I Understand This Word</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>{understood ? '✅ Yes' : '❌ Not Yet'}</Text>
              <Switch
                value={understood}
                onValueChange={setUnderstood}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={understood ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Word'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 20 },
  form: { gap: 20 },
  field: { gap: 8 },
  label: { fontSize: 16, fontWeight: '600', color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: 'white' },
  multilineInput: { minHeight: 80, textAlignVertical: 'top' },
  switchField: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  switchLabel: { fontSize: 14, color: '#666' },
  saveButton: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});