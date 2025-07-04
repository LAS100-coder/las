import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useAuth } from './AuthContext';

type GoogleSignInProps = {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
};

export function GoogleSignIn({ onSuccess, onError }: GoogleSignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log('Google Sign-In button pressed');
      
      if (__DEV__) {
        console.log('Debug mode: Creating mock user');
        // Debug mode - simulate successful sign-in
        const mockUser = {
          id: 'debug-user-' + Date.now(),
          email: 'debug@example.com',
          name: 'Debug User',
        };
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Mock user created:', mockUser);
        await signInWithGoogle(mockUser);
        onSuccess?.(mockUser);
        return;
      }
      
      console.log('Production mode: Starting Google OAuth flow');
      // Production: Use Google OAuth through AuthContext
      await signInWithGoogle();
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sign-in failed';
      onError?.(errorMessage);
      Alert.alert('Sign-In Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Google Sign-In is not available on web</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleSignIn}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Text>
      </TouchableOpacity>
      
      {__DEV__ && (
        <Text style={styles.debugText}>Debug mode: Will create test user</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 16,
  },
  debugText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10,
  },
});