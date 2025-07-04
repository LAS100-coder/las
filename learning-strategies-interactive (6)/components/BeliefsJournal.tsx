import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JournalEntry {
  date: string;
  affirmation: string;
  experience: string;
  expectation: string;
}

export default function BeliefsJournal() {
  const [affirmation, setAffirmation] = useState('');
  const [experience, setExperience] = useState('');
  const [expectation, setExpectation] = useState('');
  const [hasEntryToday, setHasEntryToday] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const today = new Date().toDateString();

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const stored = await AsyncStorage.getItem('beliefs_journal');
      if (stored) {
        const parsedEntries = JSON.parse(stored);
        setEntries(parsedEntries);
        const todayEntry = parsedEntries.find((entry: JournalEntry) => entry.date === today);
        if (todayEntry) {
          setHasEntryToday(true);
          setAffirmation(todayEntry.affirmation);
          setExperience(todayEntry.experience);
          setExpectation(todayEntry.expectation);
        }
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const saveEntry = async () => {
    if (!affirmation.trim() || !experience.trim() || !expectation.trim()) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newEntry: JournalEntry = {
      date: today,
      affirmation: affirmation.trim(),
      experience: experience.trim(),
      expectation: expectation.trim()
    };

    try {
      const updatedEntries = hasEntryToday 
        ? entries.map(entry => entry.date === today ? newEntry : entry)
        : [...entries, newEntry];
      
      await AsyncStorage.setItem('beliefs_journal', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setHasEntryToday(true);
      Alert.alert('Entry saved successfully!');
    } catch (error) {
      Alert.alert('Error saving entry');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 15, margin: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 }}>📝 Daily Beliefs Journal</Text>
      <Text style={{ fontSize: 16, color: '#7f8c8d', marginBottom: 20 }}>Build your belief foundation with daily entries</Text>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#e74c3c', marginBottom: 10 }}>💪 Today's Affirmation</Text>
        <TextInput
          style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, fontSize: 16, minHeight: 60 }}
          placeholder="I am capable of..."
          value={affirmation}
          onChangeText={setAffirmation}
          multiline
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#3498db', marginBottom: 10 }}>🌟 Past Experience</Text>
        <TextInput
          style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, fontSize: 16, minHeight: 60 }}
          placeholder="Yesterday I successfully..."
          value={experience}
          onChangeText={setExperience}
          multiline
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#f39c12', marginBottom: 10 }}>🎯 Expectation</Text>
        <TextInput
          style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, fontSize: 16, minHeight: 60 }}
          placeholder="By [date], I will..."
          value={expectation}
          onChangeText={setExpectation}
          multiline
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: '#27ae60', padding: 15, borderRadius: 10, alignItems: 'center' }}
        onPress={saveEntry}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {hasEntryToday ? 'Update Entry' : 'Save Entry'}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 16, color: '#7f8c8d', marginTop: 15, textAlign: 'center' }}>Total entries: {entries.length}</Text>
    </ScrollView>
  );
}