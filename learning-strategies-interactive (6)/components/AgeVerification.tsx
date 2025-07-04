import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type AgeVerificationProps = {
  onVerified: (isEligible: boolean) => void;
};

export function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    console.log('Age verification: Starting verification with year:', birthYear, 'month:', birthMonth);
    
    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    
    if (!year || !month || year < 1900 || year > new Date().getFullYear() || month < 1 || month > 12) {
      console.log('Age verification: Invalid input detected');
      Alert.alert('Invalid Date', 'Please enter a valid birth year and month.');
      return;
    }

    setIsLoading(true);
    
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, 1);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    const actualAge = monthDiff < 0 ? age - 1 : age;
    const isEligible = actualAge >= 13;
    
    console.log('Age verification: Calculated age:', actualAge, 'eligible:', isEligible);
    
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
      onVerified(isEligible);
    }, 500);
  };

  const handleSkipVerification = () => {
    console.log('Age verification: User chose to skip verification');
    // For debug purposes, allow skipping with eligible status
    if (__DEV__) {
      Alert.alert(
        'Skip Verification',
        'Skip age verification? (Debug mode only)',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Skip as Eligible', onPress: () => onVerified(true) },
          { text: 'Skip as Ineligible', onPress: () => onVerified(false) },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Age Verification</Text>
      <Text style={styles.subtitle}>Please enter your birth date to continue</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birth Year</Text>
        <TextInput
          style={styles.input}
          value={birthYear}
          onChangeText={setBirthYear}
          placeholder="YYYY"
          keyboardType="numeric"
          maxLength={4}
          editable={!isLoading}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birth Month</Text>
        <TextInput
          style={styles.input}
          value={birthMonth}
          onChangeText={setBirthMonth}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          editable={!isLoading}
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleVerify}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Verifying...' : 'Continue'}
        </Text>
      </TouchableOpacity>
      
      {__DEV__ && (
        <TouchableOpacity style={styles.debugButton} onPress={handleSkipVerification}>
          <Text style={styles.debugButtonText}>Skip Verification (Debug)</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  debugButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});