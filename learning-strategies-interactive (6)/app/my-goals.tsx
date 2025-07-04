import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';
import GoalStep from '../components/GoalStep';
import GoalSummary from '../components/GoalSummary';

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

export default function MyGoals() {
  const [currentStep, setCurrentStep] = useState(0);
  const [goalData, setGoalData] = useState<GoalData>({
    whatYouWant: '',
    whatYouCanDo: '',
    whatYoullSee: '',
    whatYoullHear: '',
    whatYoullFeel: '',
    isGoodForOthers: true,
    when: '',
    where: '',
    whatWillHelp: 'LearnAnythingStrat App',
    howYoullKnow: '',
    insteadOf: ''
  });

  const updateGoalData = (field: keyof GoalData, value: string | boolean) => {
    setGoalData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetGoal = () => {
    setCurrentStep(0);
    setGoalData({
      whatYouWant: '',
      whatYouCanDo: '',
      whatYoullSee: '',
      whatYoullHear: '',
      whatYoullFeel: '',
      isGoodForOthers: true,
      when: '',
      where: '',
      whatWillHelp: 'LearnAnythingStrat App',
      howYoullKnow: '',
      insteadOf: ''
    });
  };

  if (currentStep === 8) {
    return (
      <View style={styles.container}>
        <Header title="🎯 My Goals" subtitle="Your goal is ready!" />
        <GoalSummary 
          goalData={goalData} 
          onEdit={() => setCurrentStep(0)}
          onReset={resetGoal}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="🎯 Let's Make Your Goal!" subtitle={`Step ${currentStep + 1} of 8`} />
      
      {currentStep === 0 && (
        <View style={styles.introContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.eziText}>👋 Hey! I'm Ezi</Text>
            <Text style={styles.introText}>
              Let's build a super clear goal together! Just answer a few fun questions, 
              and I'll help you write it all down step by step.
            </Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={nextStep}>
            <Text style={styles.startButtonText}>Let's Start! 🚀</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep > 0 && (
        <ScrollView style={styles.scrollView}>
          <GoalStep 
            step={currentStep}
            goalData={goalData}
            updateGoalData={updateGoalData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </ScrollView>
      )}

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  introContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  speechBubble: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eziText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#28A745',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});