import { Stack } from 'expo-router';
import { AuthProvider } from '../components/AuthContext';
import { GooglePlayBillingProvider } from '../components/GooglePlayBilling';
import { useAuth } from '../components/AuthContext';
import { useGooglePlayBilling } from '../components/GooglePlayBilling';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AppContent() {
  const { isLoading: authLoading } = useAuth();
  const { isLoading: billingLoading } = useGooglePlayBilling();

  if (authLoading || billingLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="assessment" options={{ title: 'Assessment' }} />
      <Stack.Screen name="beliefs-journal" options={{ title: 'Beliefs Journal' }} />
      <Stack.Screen name="homework-diary" options={{ title: 'Homework Diary' }} />
      <Stack.Screen name="my-goals" options={{ title: 'My Goals' }} />
      <Stack.Screen name="spelling-game" options={{ title: 'Spelling Game' }} />
      <Stack.Screen name="zane-game" options={{ title: 'Zane Game' }} />
      <Stack.Screen name="lessons/[id]" options={{ title: 'Lesson' }} />
      <Stack.Screen name="modules/[id]" options={{ title: 'Module' }} />
      <Stack.Screen name="vocab-journal" options={{ title: 'Vocab Journal' }} />
      <Stack.Screen name="add-vocab-word" options={{ title: 'Add Vocab Word' }} />
      <Stack.Screen name="vocab-word/[id]" options={{ title: 'Vocab Word' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GooglePlayBillingProvider>
        <AppContent />
      </GooglePlayBillingProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});