import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';
import { AgeVerification } from './AgeVerification';
import { GoogleSignIn } from './GoogleSignIn';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LoginPrompt({ visible, onClose }: Props) {
  const { signInWithGoogle, isAgeVerified, setAgeVerified } = useAuth();
  const [step, setStep] = useState<'age' | 'signin' | 'restricted'>('age');
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const handleAgeVerification = (eligible: boolean) => {
    console.log('Age verification result:', eligible);
    setIsEligible(eligible);
    setAgeVerified(eligible);
    if (eligible) {
      setStep('signin');
    } else {
      setStep('restricted');
    }
  };

  const handleSignInSuccess = async (userData: any) => {
    try {
      console.log('LoginPrompt: Sign-in success, processing user data:', userData);
      await signInWithGoogle(userData);
      console.log('LoginPrompt: Sign-in processing complete, closing modal');
      onClose();
    } catch (error) {
      console.error('LoginPrompt: Sign-in success handler error:', error);
      Alert.alert('Error', 'Sign-in failed');
    }
  };

  const handleSignInError = (error: string) => {
    console.error('LoginPrompt: Sign-in error:', error);
    Alert.alert('Sign-In Error', error, [
      { text: 'Try Again', onPress: () => setStep('signin') },
      { text: 'Cancel', onPress: onClose },
    ]);
  };

  const handleSkip = () => {
    console.log('LoginPrompt: User skipped sign-in');
    onClose();
  };

  const renderContent = () => {
    console.log('LoginPrompt: Rendering content, step:', step, 'isAgeVerified:', isAgeVerified);
    
    if (isAgeVerified && step === 'age') {
      console.log('LoginPrompt: Age already verified, moving to signin');
      setStep('signin');
    }

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
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        {renderContent()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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