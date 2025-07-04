import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PurchaseButton } from './PurchaseButton';
import { PRODUCT_IDS } from './GooglePlayBilling';

type SubscriptionPlansProps = {
  onPurchaseSuccess?: () => void;
};

export function SubscriptionPlans({ onPurchaseSuccess }: SubscriptionPlansProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Choose Your Plan</Text>
      
      {/* Ad-Free Plan */}
      <View style={styles.planSection}>
        <Text style={styles.planTitle}>Ad-Free Plan</Text>
        <Text style={styles.planFeatures}>• Access to Free Section only{"\n"}• No ads shown</Text>
        
        <PurchaseButton
          productId={PRODUCT_IDS.AD_FREE_MONTHLY}
          title="Monthly"
          price="$3.50/month"
          description="Billed monthly"
          onPurchaseSuccess={onPurchaseSuccess}
        />
        
        <PurchaseButton
          productId={PRODUCT_IDS.AD_FREE_YEARLY}
          title="Yearly (Save 17%)"
          price="$35/year"
          description="Billed annually"
          onPurchaseSuccess={onPurchaseSuccess}
        />
      </View>

      {/* Premium Plan */}
      <View style={[styles.planSection, styles.popularPlan]}>
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
        <Text style={styles.planTitle}>Premium Plan</Text>
        <Text style={styles.planFeatures}>• Access to Free + Premium Sections{"\n"}• No ads shown{"\n"}• Full content library</Text>
        
        <PurchaseButton
          productId={PRODUCT_IDS.PREMIUM_MONTHLY}
          title="Monthly"
          price="$7/month"
          description="Billed monthly"
          onPurchaseSuccess={onPurchaseSuccess}
        />
        
        <PurchaseButton
          productId={PRODUCT_IDS.PREMIUM_YEARLY}
          title="Yearly (Save 17%)"
          price="$70/year"
          description="Billed annually"
          onPurchaseSuccess={onPurchaseSuccess}
        />
      </View>

      {/* Family Plan */}
      <View style={styles.planSection}>
        <Text style={styles.planTitle}>Family Plan</Text>
        <Text style={styles.planFeatures}>• Access to Free + Premium Sections{"\n"}• No ads shown{"\n"}• Up to 4 users/devices{"\n"}• Shared subscription</Text>
        
        <PurchaseButton
          productId={PRODUCT_IDS.FAMILY_MONTHLY}
          title="Monthly"
          price="$11/month"
          description="Billed monthly"
          onPurchaseSuccess={onPurchaseSuccess}
        />
        
        <PurchaseButton
          productId={PRODUCT_IDS.FAMILY_YEARLY}
          title="Yearly (Save 17%)"
          price="$110/year"
          description="Billed annually"
          onPurchaseSuccess={onPurchaseSuccess}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  planSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  popularPlan: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  planFeatures: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
});