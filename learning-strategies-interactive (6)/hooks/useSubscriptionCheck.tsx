import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useGooglePlayBilling } from '../components/GooglePlayBilling';

export function useSubscriptionCheck() {
  const { user, subscriptionPlan } = useAuth();
  const { checkSubscriptionStatus } = useGooglePlayBilling();
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkSubscription = useCallback(async () => {
    if (!user || isChecking) return;
    
    try {
      setIsChecking(true);
      const billingStatus = await checkSubscriptionStatus();
      setLastChecked(new Date());
      console.log('Subscription check completed:', billingStatus);
    } catch (error) {
      console.error('Subscription check failed:', error);
      Alert.alert('Error', 'Failed to check subscription status');
    } finally {
      setIsChecking(false);
    }
  }, [user, subscriptionPlan, checkSubscriptionStatus, isChecking]);

  const isSubscriptionActive = useCallback(() => {
    try {
      return subscriptionPlan !== 'free';
    } catch (error) {
      console.warn('Subscription active check error:', error);
      return false;
    }
  }, [subscriptionPlan]);

  const getSubscriptionExpiry = useCallback(async () => {
    try {
      return null;
    } catch (error) {
      console.warn('Subscription expiry check error:', error);
      return null;
    }
  }, []);

  const shouldShowUpgradePrompt = useCallback((requiredPlan: string) => {
    try {
      const planHierarchy = { 'free': 0, 'ad-free': 1, 'premium': 2, 'family': 3 };
      const currentLevel = planHierarchy[subscriptionPlan as keyof typeof planHierarchy] || 0;
      const requiredLevel = planHierarchy[requiredPlan as keyof typeof planHierarchy] || 0;
      return currentLevel < requiredLevel;
    } catch (error) {
      console.warn('Upgrade prompt check error:', error);
      return true;
    }
  }, [subscriptionPlan]);

  return {
    isChecking,
    lastChecked,
    checkSubscription,
    isSubscriptionActive,
    getSubscriptionExpiry,
    shouldShowUpgradePrompt,
  };
}