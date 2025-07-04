import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import HomeworkDiary from '../components/HomeworkDiary';

export default function HomeworkDiaryPage() {
  return (
    <View style={styles.container}>
      <Header 
        title="Homework Diary" 
        subtitle="Organize and track your daily assignments"
      />
      <HomeworkDiary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});