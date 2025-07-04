import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/app/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

type User = {
  id: string;
  email: string;
  name?: string;
};

type SubscriptionPlan = 'free' | 'ad-free' | 'premium' | 'family';

type AuthContextType = {
  user: User | null;
  subscriptionPlan: SubscriptionPlan;
  isLoading: boolean;
  signInWithGoogle: (userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  hasAccess: (section: 'free' | 'premium') => boolean;
  showAds: boolean;
  error: string | null;
  isAgeVerified: boolean;
  setAgeVerified: (verified: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('free');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('Initializing auth...');
      const { data } = await supabase.auth.getSession();
      console.log('Current session:', data?.session?.user?.id || 'No session');
      
      if (data?.session?.user) {
        const userData = {
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: data.session.user.user_metadata?.name
        };
        console.log('Setting user from session:', userData);
        setUser(userData);
        await fetchSubscriptionPlan(data.session.user.id);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      setError('Failed to initialize authentication');
    } finally {
      setIsLoading(false);
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        console.log('Auth state changed:', event, session?.user?.id || 'No user');
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name
          };
          console.log('Setting user from auth change:', userData);
          setUser(userData);
          await fetchSubscriptionPlan(session.user.id);
        } else {
          console.log('Clearing user data');
          setUser(null);
          setSubscriptionPlan('free');
        }
      } catch (err) {
        console.error('Auth state change error:', err);
      }
    });
  };

  const fetchSubscriptionPlan = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', userId)
        .single();
      setSubscriptionPlan((data?.plan as SubscriptionPlan) || 'free');
    } catch (err) {
      console.warn('Failed to fetch subscription plan:', err);
      setSubscriptionPlan('free');
    }
  };

  const signInWithGoogle = async (userData?: any) => {
    try {
      console.log('signInWithGoogle called with:', userData ? 'userData provided' : 'no userData');
      setError(null);
      
      if (userData) {
        console.log('Processing mock user data:', userData);
        setUser(userData);
        
        if (userData.id && userData.id.startsWith('debug-user-')) {
          console.log('Setting debug user subscription to premium');
          setSubscriptionPlan('premium');
        } else if (userData.id) {
          await fetchSubscriptionPlan(userData.id);
        }
        
        Alert.alert('Success', 'Successfully signed in!');
      } else {
        Alert.alert('Info', 'Google sign-in temporarily disabled for compatibility');
      }
    } catch (err) {
      console.error('signInWithGoogle error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Sign-in failed';
      setError(errorMessage);
      Alert.alert('Sign-In Error', errorMessage);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      await supabase.auth.signOut();
      setUser(null);
      setSubscriptionPlan('free');
      setError(null);
      console.log('Sign out complete');
    } catch (err) {
      console.error('Sign-out error:', err);
      Alert.alert('Error', 'Sign-out failed');
    }
  };

  const hasAccess = (section: 'free' | 'premium') => {
    if (section === 'free') return true;
    return subscriptionPlan === 'premium' || subscriptionPlan === 'family';
  };

  const showAds = subscriptionPlan === 'free';
  const setAgeVerified = (verified: boolean) => {
    console.log('Age verification set to:', verified);
    setIsAgeVerified(verified);
  };

  return (
    <AuthContext.Provider value={{
      user, subscriptionPlan, isLoading, signInWithGoogle, signOut,
      hasAccess, showAds, error, isAgeVerified, setAgeVerified
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};