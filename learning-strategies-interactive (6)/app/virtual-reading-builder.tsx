import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import VirtualReadingWelcome from '@/components/VirtualReadingWelcome';
import VirtualReadingBuilder from '@/components/VirtualReadingBuilder';
import VirtualReadingComplete from '@/components/VirtualReadingComplete';

type ActivityStep = 'welcome' | 'activity' | 'complete';

const VirtualReadingBuilderScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ActivityStep>('welcome');
  const router = useRouter();

  const handleStart = () => {
    setCurrentStep('activity');
  };

  const handleComplete = () => {
    setCurrentStep('complete');
  };

  const handleFinish = () => {
    router.back();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <VirtualReadingWelcome onStart={handleStart} />;
      case 'activity':
        return <VirtualReadingBuilder onComplete={handleComplete} />;
      case 'complete':
        return <VirtualReadingComplete onFinish={handleFinish} />;
      default:
        return <VirtualReadingWelcome onStart={handleStart} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Virtual Reading Builder" showBackButton />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default VirtualReadingBuilderScreen;