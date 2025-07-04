import React from 'react';
import { View, StyleSheet } from 'react-native';
import VocabJournal from '../components/VocabJournal';

export default function VocabJournalScreen() {
  return (
    <View style={styles.container}>
      <VocabJournal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});