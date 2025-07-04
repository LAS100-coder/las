import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PurchaseButton } from './PurchaseButton';
import { PRODUCT_IDS } from './GooglePlayBilling';

type SubscriptionPlan = {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  monthlyProductId: string;
  yearlyProductId: string;
  features: string[];
  popular?: boolean;
};

const plans: SubscriptionPlan[] = [
  {
    id: 'ad-free',
    name: 'Ad-Free Plan',
    monthlyPrice: '$3.50',
    yearlyPrice: '$35',
    monthlyProductId: PRODUCT_IDS.AD_FREE_MONTHLY,
    yearlyProductId: PRODUCT_IDS.AD_FREE_YEARLY,
    features: ['Free Section Access', 'No Ads', 'Basic Support']
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    monthlyPrice: '$7',
    yearlyPrice: '$70',
    monthlyProductId: PRODUCT_IDS.PREMIUM_MONTHLY,
    yearlyProductId: PRODUCT_IDS.PREMIUM_YEARLY,
    features: ['Free + Premium Sections', 'No Ads', 'Priority Support', 'All Features'],
    popular: true
  },
  {
    id: 'family',
    name: 'Family Plan',
    monthlyPrice: '$11',
    yearlyPrice: '$110',
    monthlyProductId: PRODUCT_IDS.FAMILY_MONTHLY,
    yearlyProductId: PRODUCT_IDS.FAMILY_YEARLY,
    features: ['Free + Premium Sections', 'No Ads', 'Up to 4 Users', 'Family Management', 'Priority Support']
  }
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onPurchaseSuccess?: () => void;
};

export default function SubscriptionModal({ visible, onClose, onPurchaseSuccess }: Props) {
  const [isYearly, setIsYearly] = useState(false);

  const handlePurchaseSuccess = () => {
    onPurchaseSuccess?.();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, !isYearly && styles.activeToggle]}
            onPress={() => setIsYearly(false)}
          >
            <Text style={[styles.toggleText, !isYearly && styles.activeToggleText]}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, isYearly && styles.activeToggle]}
            onPress={() => setIsYearly(true)}
          >
            <Text style={[styles.toggleText, isYearly && styles.activeToggleText]}>Yearly (Save 17%)</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.plansContainer}>
          {plans.map((plan) => (
            <View key={plan.id} style={[styles.planCard, plan.popular && styles.popularPlan]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                <Text style={styles.planPeriod}>/{isYearly ? 'year' : 'month'}</Text>
              </Text>
              {plan.features.map((feature, index) => (
                <Text key={index} style={styles.feature}>✓ {feature}</Text>
              ))}
              
              <PurchaseButton
                productId={isYearly ? plan.yearlyProductId : plan.monthlyProductId}
                title="Subscribe"
                price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                onPurchaseSuccess={handlePurchaseSuccess}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  toggleContainer: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    color: '#666',
    fontWeight: '600',
  },
  activeToggleText: {
    color: 'white',
  },
  plansContainer: {
    flex: 1,
    padding: 20,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  popularPlan: {
    borderColor: '#007bff',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 16,
  },
  planPeriod: {
    fontSize: 16,
    color: '#666',
  },
  feature: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});