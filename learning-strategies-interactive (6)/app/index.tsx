import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Linking, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../components/AuthContext';
import { useGooglePlayBilling } from '../components/GooglePlayBilling';

const modules = [
  {
    id: 1,
    title: 'Beliefs',
    description: 'Success begins with the right beliefs',
    gradient: ['#feca57', '#ff9ff3']
  },
  {
    id: 2,
    title: 'How the Mind Works',
    description: 'Understand your brain\'s learning mechanisms',
    gradient: ['#4834d4', '#686de0']
  },
  {
    id: 3,
    title: 'Reading and Conceptualizing',
    description: 'Master the art of conceptual reading',
    gradient: ['#00d2d3', '#54a0ff']
  }
];

export default function Index() {
  const { user, hasAccess, subscriptionPlan, error: authError, isLoading: authLoading } = useAuth();
  const { error: billingError, isLoading: billingLoading } = useGooglePlayBilling();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  if (authLoading || billingLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleModulePress = (moduleId: number) => {
    try {
      router.push(`/modules/${moduleId}`);
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Failed to open module');
    }
  };

  const handlePremiumFeature = (route: string, featureName: string) => {
    try {
      if (!user) {
        Alert.alert('Sign In Required', 'Please sign in to access premium features');
        return;
      }
      
      if (!hasAccess('premium')) {
        Alert.alert('Premium Required', 'This feature requires a premium subscription');
        return;
      }
      
      router.push(route);
    } catch (error) {
      console.error('Premium feature navigation error:', error);
      Alert.alert('Error', 'Failed to access feature');
    }
  };

  const handleSignIn = () => {
    if (user) {
      Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: () => {} }
      ]);
    } else {
      Alert.alert('Sign In', 'Sign in functionality temporarily disabled for compatibility');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Anything Strat App</Text>
        <Text style={styles.subtitle}>The application of knowledge is power</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {(authError || billingError) && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {authError || billingError}
            </Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>
            {user ? `👋 Hi ${user.name || user.email}!` : '🔐 Sign In for Premium Features'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.sectionsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🆓 Free</Text>
            <View style={styles.sectionContent}>
              {modules.map((module) => (
                <TouchableOpacity
                  key={module.id}
                  style={styles.moduleCard}
                  onPress={() => handleModulePress(module.id)}
                >
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ Premium</Text>
            <View style={styles.sectionContent}>
              <TouchableOpacity 
                style={styles.premiumButton} 
                onPress={() => handlePremiumFeature('/assessment', 'Learning Assessment')}
              >
                <Text style={styles.premiumButtonText}>🧠 Learning Assessment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.premiumButton} 
                onPress={() => handlePremiumFeature('/beliefs-journal', 'Beliefs Journal')}
              >
                <Text style={styles.premiumButtonText}>📝 My Beliefs</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.premiumButton} 
                onPress={() => handlePremiumFeature('/my-goals', 'Goal Setting')}
              >
                <Text style={styles.premiumButtonText}>🎯 My Goals</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#FFE6E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionContent: {
    gap: 12,
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#666',
  },
  premiumButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  premiumButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});