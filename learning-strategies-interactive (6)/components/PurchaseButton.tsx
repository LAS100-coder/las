import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useGooglePlayBilling } from './GooglePlayBilling';

type PurchaseButtonProps = {
  productId: string;
  title: string;
  price: string;
  description?: string;
  onPurchaseSuccess?: () => void;
};

export function PurchaseButton({ 
  productId, 
  title, 
  price, 
  description,
  onPurchaseSuccess 
}: PurchaseButtonProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { purchaseProduct } = useGooglePlayBilling();

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      
      // TODO: Add pre-purchase validation
      // - Check if user is already subscribed
      // - Validate user authentication
      
      await purchaseProduct(productId);
      
      // TODO: Handle successful purchase
      // - Update local subscription state
      // - Sync with backend
      // - Show success message
      
      Alert.alert('Success', 'Purchase completed successfully!');
      onPurchaseSuccess?.();
      
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert('Purchase Failed', 'Unable to complete purchase. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <TouchableOpacity 
        style={[styles.button, isPurchasing && styles.buttonDisabled]}
        onPress={handlePurchase}
        disabled={isPurchasing}
      >
        <Text style={styles.buttonText}>
          {isPurchasing ? 'Processing...' : `Subscribe for ${price}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});