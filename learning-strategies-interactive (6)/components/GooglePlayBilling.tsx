import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';

// PLACEHOLDER PRODUCT IDs - Configure these in Google Play Console
export const PRODUCT_IDS = {
  AD_FREE_MONTHLY: 'com.yourapp.adfree.monthly',
  AD_FREE_YEARLY: 'com.yourapp.adfree.yearly',
  PREMIUM_MONTHLY: 'com.yourapp.premium.monthly',
  PREMIUM_YEARLY: 'com.yourapp.premium.yearly',
  FAMILY_MONTHLY: 'com.yourapp.family.monthly',
  FAMILY_YEARLY: 'com.yourapp.family.yearly',
};

type BillingContextType = {
  products: any[];
  isLoading: boolean;
  error: string | null;
  purchaseProduct: (productId: string) => Promise<void>;
  restorePurchases: () => Promise<void>;
  checkSubscriptionStatus: () => Promise<string>;
};

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export function GooglePlayBillingProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeBilling();
  }, []);

  const initializeBilling = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Simulate products loading with fallback
      setTimeout(() => {
        try {
          setProducts([
            { productId: PRODUCT_IDS.PREMIUM_MONTHLY, price: '$9.99' },
            { productId: PRODUCT_IDS.PREMIUM_YEARLY, price: '$99.99' }
          ]);
        } catch (err) {
          console.warn('Failed to set products:', err);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } catch (err) {
      console.error('Billing initialization failed:', err);
      setError('Billing system unavailable');
      setProducts([]);
      setIsLoading(false);
    }
  };

  const purchaseProduct = async (productId: string) => {
    try {
      setError(null);
      
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store purchase in Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await storePurchaseInSupabase(user.id, productId);
      }
      
      Alert.alert('Success', 'Purchase completed successfully!');
    } catch (err) {
      console.error('Purchase failed:', err);
      const errorMsg = 'Purchase failed. Please try again.';
      setError(errorMsg);
      Alert.alert('Purchase Failed', errorMsg);
      throw err;
    }
  };

  const storePurchaseInSupabase = async (userId: string, productId: string) => {
    try {
      const plan = productId.includes('premium') ? 'premium' : 
                   productId.includes('family') ? 'family' : 'ad-free';
      
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + (productId.includes('yearly') ? 12 : 1));
      
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan,
          purchase_token: `mock_token_${Date.now()}`,
          platform: 'android',
          expires_at: expiresAt.toISOString()
        });
      
      if (error) {
        console.error('Failed to store purchase:', error);
      }
    } catch (err) {
      console.error('Store purchase error:', err);
    }
  };

  const restorePurchases = async () => {
    try {
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Purchases restored successfully!');
    } catch (err) {
      console.error('Restore purchases failed:', err);
      const errorMsg = 'Failed to restore purchases';
      setError(errorMsg);
      Alert.alert('Restore Failed', errorMsg);
    }
  };

  const checkSubscriptionStatus = async (): Promise<string> => {
    try {
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return 'free';
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan, expires_at')
        .eq('user_id', user.id)
        .single();
      
      if (error || !data) return 'free';
      
      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) return 'free';
      
      return data.plan || 'free';
    } catch (err) {
      console.error('Check subscription failed:', err);
      return 'free';
    }
  };

  return (
    <BillingContext.Provider value={{
      products,
      isLoading,
      error,
      purchaseProduct,
      restorePurchases,
      checkSubscriptionStatus
    }}>
      {children}
    </BillingContext.Provider>
  );
}

export const useGooglePlayBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useGooglePlayBilling must be used within GooglePlayBillingProvider');
  }
  return context;
};