import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { lessonStyles as styles } from './styles';
import { lessonData } from './lessonData';

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessonData[id || '1-0'];

  if (!lesson) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Lesson not found</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>The lesson you're looking for doesn't exist.</Text>
          <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
            <Text style={styles.homeButtonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleCompleteExercise = () => {
    Alert.alert(
      'Exercise Complete!',
      'Great job completing this lesson! You will now be taken back to the module.',
      [
        {
          text: 'Continue',
          onPress: () => router.push(`/modules/${lesson.moduleId}`)
        }
      ]
    );
  };

  const handleTryActivity = () => {
    if (lesson.activityLink) {
      router.push(lesson.activityLink);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{lesson.title}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.lessonContent}>{lesson.content}</Text>
        
        {lesson.exercise && (
          <View style={styles.exerciseSection}>
            <Text style={styles.exerciseTitle}>Exercise:</Text>
            <Text style={styles.exerciseText}>{lesson.exercise}</Text>
          </View>
        )}
        
        {lesson.activityLink && (
          <TouchableOpacity style={styles.activityButton} onPress={handleTryActivity}>
            <Ionicons name="play-circle" size={20} color="#fff" style={styles.completeIcon} />
            <Text style={styles.completeButtonText}>Try Interactive Activity</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteExercise}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.completeIcon} />
          <Text style={styles.completeButtonText}>Complete Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}