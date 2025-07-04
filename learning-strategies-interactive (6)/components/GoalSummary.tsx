import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GoalData {
  whatYouWant: string;
  whatYouCanDo: string;
  whatYoullSee: string;
  whatYoullHear: string;
  whatYoullFeel: string;
  isGoodForOthers: boolean;
  when: string;
  where: string;
  whatWillHelp: string;
  howYoullKnow: string;
  insteadOf: string;
}

interface GoalSummaryProps {
  goalData: GoalData;
  onEdit: () => void;
  onReset: () => void;
}

export default function GoalSummary({ goalData, onEdit, onReset }: GoalSummaryProps) {
  const saveGoal = async () => {
    try {
      const goalWithDate = {
        ...goalData,
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      const existingGoals = await AsyncStorage.getItem('saved_goals');
      const goals = existingGoals ? JSON.parse(existingGoals) : [];
      goals.push(goalWithDate);
      
      await AsyncStorage.setItem('saved_goals', JSON.stringify(goals));
      Alert.alert('Success!', 'Your goal has been saved! 🎉');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your goal. Please try again.');
    }
  };

  const setReminder = () => {
    Alert.alert('Reminder Set!', 'We\'ll remind you about your goal weekly! 🔔');
  };

  const shareGoal = () => {
    Alert.alert('Share Goal', 'Feature coming soon! You\'ll be able to share with parents and teachers. 📤');
  };

  const reviewGoal = () => {
    Alert.alert('Weekly Review', 'Great idea! We\'ll help you review your progress weekly. 📊');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.celebrationHeader}>
        <Text style={styles.celebrationText}>🎉 Awesome job!</Text>
        <Text style={styles.subtitle}>Here's your finished goal 👇</Text>
        <Text style={styles.editNote}>You can edit it anytime.</Text>
      </View>

      <View style={styles.goalContainer}>
        <Text style={styles.goalTitle}>My Goal</Text>
        
        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>🎯 What I Want:</Text>
          <Text style={styles.sectionContent}>{goalData.whatYouWant}</Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>💪 What I Can Do:</Text>
          <Text style={styles.sectionContent}>{goalData.whatYouCanDo}</Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>🌟 When I Succeed:</Text>
          <Text style={styles.sectionContent}>I'll see: {goalData.whatYoullSee}</Text>
          <Text style={styles.sectionContent}>I'll hear: {goalData.whatYoullHear}</Text>
          <Text style={styles.sectionContent}>I'll feel: {goalData.whatYoullFeel}</Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>📅 When & Where:</Text>
          <Text style={styles.sectionContent}>When: {goalData.when}</Text>
          <Text style={styles.sectionContent}>Where: {goalData.where}</Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>🛠️ What Will Help Me:</Text>
          <Text style={styles.sectionContent}>{goalData.whatWillHelp}</Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>✅ How I'll Know I Did It:</Text>
          <Text style={styles.sectionContent}>{goalData.howYoullKnow}</Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>🤝 Good for Everyone:</Text>
          <Text style={styles.sectionContent}>{goalData.isGoodForOthers ? 'Yes! This goal helps me and others.' : 'Working on making this better for everyone.'}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={saveGoal}>
          <Text style={styles.actionButtonText}>🔖 Save Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={setReminder}>
          <Text style={styles.actionButtonText}>🛎️ Set Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={shareGoal}>
          <Text style={styles.actionButtonText}>📤 Share Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={reviewGoal}>
          <Text style={styles.actionButtonText}>🔁 Weekly Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>✏️ Edit Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetButtonText}>🔄 Start New Goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  celebrationHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  celebrationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  editNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  goalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28A745',
    textAlign: 'center',
    marginBottom: 20,
  },
  goalSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 4,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});