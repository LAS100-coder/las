import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RevisionPlanner from '../components/RevisionPlanner';
import RevisionPlannerRetest from '../components/RevisionPlannerRetest';
import RevisionPlannerExit from '../components/RevisionPlannerExit';
import RevisionPlannerComplete from '../components/RevisionPlannerComplete';

type Step = 'test' | 'operate' | 'retest' | 'exit' | 'complete';

interface RevisionData {
  topic: string;
  initialScore: string;
  unknownItems: string;
  belief: string;
  visualExample: string;
  definitions: string;
  retestScore: string;
  summary: string;
  nextTopic: string;
}

export default function RevisionPlannerPage() {
  const [currentStep, setCurrentStep] = useState<Step>('test');
  const [data, setData] = useState<RevisionData>({
    topic: '',
    initialScore: '',
    unknownItems: '',
    belief: '',
    visualExample: '',
    definitions: '',
    retestScore: '',
    summary: '',
    nextTopic: ''
  });

  const updateData = (field: keyof RevisionData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const resetData = () => {
    setData({
      topic: '',
      initialScore: '',
      unknownItems: '',
      belief: '',
      visualExample: '',
      definitions: '',
      retestScore: '',
      summary: '',
      nextTopic: ''
    });
    setCurrentStep('test');
  };

  const getStepNumber = (step: Step): number => {
    const steps = { test: 1, operate: 2, retest: 3, exit: 4, complete: 4 };
    return steps[step];
  };

  if (currentStep === 'complete') {
    return <RevisionPlannerComplete data={data} onRestart={resetData} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>📚 Revise Like a Pro: T.O.T.E Strategy</Text>
          <Text style={styles.subtitle}>Test → Operate → Re-Test → Exit & Move On</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        {['test', 'operate', 'retest', 'exit'].map((step, index) => (
          <View key={step} style={[styles.progressStep, currentStep === step && styles.activeStep]}>
            <Text style={[styles.progressText, currentStep === step && styles.activeText]}>
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
      
      <ScrollView style={styles.content}>
        {(currentStep === 'test' || currentStep === 'operate') && (
          <RevisionPlanner
            currentStep={currentStep}
            data={data}
            updateData={updateData}
            onNext={(nextStep) => setCurrentStep(nextStep)}
          />
        )}
        
        {currentStep === 'retest' && (
          <RevisionPlannerRetest
            data={data}
            updateData={updateData}
            onBackToOperate={() => setCurrentStep('operate')}
            onProceedToExit={() => setCurrentStep('exit')}
          />
        )}
        
        {currentStep === 'exit' && (
          <RevisionPlannerExit
            data={data}
            updateData={updateData}
            onComplete={() => setCurrentStep('complete')}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#667eea', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 15 },
  headerContent: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#e8f4fd', marginTop: 5 },
  progressContainer: { flexDirection: 'row', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  progressStep: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e9ecef', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  activeStep: { backgroundColor: '#667eea' },
  progressText: { fontSize: 16, fontWeight: 'bold', color: '#6c757d' },
  activeText: { color: '#fff' },
  content: { flex: 1 }
});