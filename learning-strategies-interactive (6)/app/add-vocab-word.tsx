import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddVocabWord from '../components/AddVocabWord';

export default function AddVocabWordScreen() {
  return (
    <View style={styles.container}>
      <AddVocabWord />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});