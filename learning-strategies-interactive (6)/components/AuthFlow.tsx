import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AgeVerification } from './AgeVerification';
import { GoogleSignIn } from './GoogleSignIn';

type AuthFlowProps = {
  onAuthSuccess: (user: any) => void;
  onSkip?: () => void;
};

export function AuthFlow({ onAuthSuccess, onSkip }: AuthFlowProps) {
  const [step, setStep] = useState<'age' | 'signin' | 'restricted'>('age');
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const handleAgeVerification = (eligible: boolean) => {
    setIsEligible(eligible);
    if (eligible) {
      setStep('signin');
    } else {
      setStep('restricted');
    }
  };

  const handleSignInSuccess = (user: any) => {
    onAuthSuccess(user);
  };

  const handleSignInError = (error: string) => {
    Alert.alert('Sign-In Error', error, [
      { text: 'Try Again', onPress: () => setStep('signin') },
      { text: 'Skip', onPress: onSkip },
    ]);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  if (step === 'age') {
    return <AgeVerification onVerified={handleAgeVerification} />;
  }

  if (step === 'restricted') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Access Restricted</Text>
        <Text style={styles.message}>
          This app is designed for users 13 years and older. 
          You can still use the app with limited features.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSkip}>
          <Text style={styles.buttonText}>Continue with Limited Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Sign in to access premium features and sync your progress
      </Text>
      
      <GoogleSignIn 
        onSuccess={handleSignInSuccess}
        onError={handleSignInError}
      />
      
      {onSkip && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  skipText: {
    color: '#007AFF',
    fontSize: 16,
  },
});