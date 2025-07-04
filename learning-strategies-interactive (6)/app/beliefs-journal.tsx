import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import BeliefsJournal from '../components/BeliefsJournal';

export default function BeliefsJournalPage() {
  return (
    <View style={styles.container}>
      <Header 
        title="My Beliefs Journal" 
        subtitle="Daily reflection and mindset transformation"
      />
      <View style={styles.content}>
        <BeliefsJournal />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});