import React from 'react';
import { View, StyleSheet } from 'react-native';
import VocabWordDetail from '../../components/VocabWordDetail';

export default function VocabWordDetailScreen() {
  return (
    <View style={styles.container}>
      <VocabWordDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});