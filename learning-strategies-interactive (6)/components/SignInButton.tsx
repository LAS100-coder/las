import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';

type Props = {
  onPress: () => void;
};

export default function SignInButton({ onPress }: Props) {
  const { user, signOut } = useAuth();

  const handlePress = () => {
    console.log('SignInButton pressed, user:', user ? 'logged in' : 'not logged in');
    if (user) {
      console.log('User is signed in, signing out...');
      signOut();
    } else {
      console.log('User not signed in, opening login prompt...');
      onPress();
    }
  };

  if (user) {
    return (
      <TouchableOpacity style={styles.signedInButton} onPress={handlePress}>
        <Text style={styles.signedInText}>
          👋 Hi {user.name || user.email}! Tap to sign out
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.signInButton} onPress={handlePress}>
      <Text style={styles.signInText}>🔐 Sign In for Premium Features</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signedInButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signedInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});