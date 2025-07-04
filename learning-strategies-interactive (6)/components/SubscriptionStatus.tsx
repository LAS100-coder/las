import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';
import { useGooglePlayBilling } from './GooglePlayBilling';

type SubscriptionStatusProps = {
  onManageSubscription?: () => void;
};

export function SubscriptionStatus({ onManageSubscription }: SubscriptionStatusProps) {
  const { user, subscriptionPlan, error: authError } = useAuth();
  const { restorePurchases, error: billingError } = useGooglePlayBilling();
  const [isRestoring, setIsRestoring] = useState(false);

  const getStatusInfo = () => {
    switch (subscriptionPlan) {
      case 'ad-free':
        return {
          title: 'Ad-Free Plan',
          description: 'Access to Free Section without ads',
          color: '#4CAF50',
        };
      case 'premium':
        return {
          title: 'Premium Plan',
          description: 'Full access to all content without ads',
          color: '#2196F3',
        };
      case 'family':
        return {
          title: 'Family Plan',
          description: 'Full access for up to 4 users without ads',
          color: '#9C27B0',
        };
      default:
        return {
          title: 'Free Plan',
          description: 'Access to Free Section with ads',
          color: '#757575',
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleRestorePurchases = async () => {
    if (isRestoring) return;
    
    try {
      setIsRestoring(true);
      await restorePurchases();
      Alert.alert('Success', 'Purchases restored successfully');
    } catch (error) {
      console.error('Restore purchases failed:', error);
      Alert.alert('Error', 'Failed to restore purchases. Please try again.');
    } finally {
      setIsRestoring(false);
    }
  };

  const handleManageSubscription = () => {
    if (onManageSubscription) {
      onManageSubscription();
    } else {
      Alert.alert('Info', 'Subscription management not available');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not Signed In</Text>
        <Text style={styles.description}>Please sign in to view your subscription status</Text>
        {authError && (
          <Text style={styles.errorText}>Error: {authError}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
        <Text style={styles.statusTitle}>{statusInfo.title}</Text>
      </View>
      
      <Text style={styles.description}>{statusInfo.description}</Text>
      
      {(authError || billingError) && (
        <Text style={styles.errorText}>
          {authError || billingError}
        </Text>
      )}
      
      <View style={styles.buttonContainer}>
        {subscriptionPlan !== 'free' && (
          <TouchableOpacity 
            style={styles.button}
            onPress={handleManageSubscription}
          >
            <Text style={styles.buttonText}>Manage Subscription</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton, isRestoring && styles.disabledButton]}
          onPress={handleRestorePurchases}
          disabled={isRestoring}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            {isRestoring ? 'Restoring...' : 'Restore Purchases'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});