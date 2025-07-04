import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SubscriptionPlans } from './SubscriptionPlans';

type UpgradePromptModalProps = {
  visible: boolean;
  onClose: () => void;
  feature: string;
  requiredPlan: 'ad-free' | 'premium' | 'family';
};

export function UpgradePromptModal({ 
  visible, 
  onClose, 
  feature, 
  requiredPlan 
}: UpgradePromptModalProps) {
  
  const getPlanBenefits = () => {
    switch (requiredPlan) {
      case 'ad-free':
        return ['Remove all ads', 'Uninterrupted learning'];
      case 'premium':
        return ['Access all premium content', 'Advanced features', 'No ads'];
      case 'family':
        return ['Share with up to 4 users', 'All premium features', 'Family management'];
      default:
        return [];
    }
  };

  const handlePurchaseSuccess = () => {
    // TODO: Refresh subscription status
    // TODO: Navigate back to the feature
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Unlock {feature}</Text>
          <Text style={styles.subtitle}>
            This feature requires a {requiredPlan} subscription
          </Text>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>What you'll get:</Text>
            {getPlanBenefits().map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>✓</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <SubscriptionPlans onPurchaseSuccess={handlePurchaseSuccess} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 50,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  benefitsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 12,
    fontWeight: 'bold',
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});