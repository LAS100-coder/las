import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

type Answer = 'A' | 'B' | 'C' | null;

interface AssessmentResultsProps {
  sensoryAnswers: Answer[];
  beliefsAnswers: Answer[];
}

export default function AssessmentResults({ sensoryAnswers, beliefsAnswers }: AssessmentResultsProps) {
  const calculateSensoryResult = () => {
    const counts = { A: 0, B: 0, C: 0 };
    sensoryAnswers.forEach(answer => {
      if (answer) counts[answer]++;
    });
    
    const max = Math.max(counts.A, counts.B, counts.C);
    if (counts.A === max) return { type: 'Visual Learner', desc: 'You learn best through visual information like diagrams, charts, and images.' };
    if (counts.B === max) return { type: 'Auditory Learner', desc: 'You learn best through listening, discussions, and verbal explanations.' };
    return { type: 'Kinesthetic Learner', desc: 'You learn best through hands-on activities and physical engagement.' };
  };

  const calculateBeliefsScore = () => {
    let score = 0;
    beliefsAnswers.forEach(answer => {
      if (answer === 'A') score += 2;
      else if (answer === 'B') score += 1;
    });
    
    if (score >= 8) return {
      level: 'Strong Foundation',
      desc: 'You have strong, empowering beliefs and excellent study organization habits.',
      color: '#28A745'
    };
    if (score >= 5) return {
      level: 'Good Progress',
      desc: 'You have some good habits and beliefs, but there\'s room to strengthen your learning approach.',
      color: '#FFC107'
    };
    return {
      level: 'Growth Opportunity',
      desc: 'Your beliefs and organization may be holding you back — but you can improve quickly with the right strategies!',
      color: '#DC3545'
    };
  };

  const sensoryResult = calculateSensoryResult();
  const beliefsResult = calculateBeliefsScore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultsCard}>
        <Text style={styles.title}>🎉 Your Assessment Results</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 Your Learning Style</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultType}>{sensoryResult.type}</Text>
            <Text style={styles.resultDesc}>{sensoryResult.desc}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Your Learning Beliefs</Text>
          <View style={[styles.resultBox, { borderLeftColor: beliefsResult.color }]}>
            <Text style={[styles.resultType, { color: beliefsResult.color }]}>{beliefsResult.level}</Text>
            <Text style={styles.resultDesc}>{beliefsResult.desc}</Text>
          </View>
        </View>
        
        <View style={styles.actionSection}>
          <Text style={styles.actionTitle}>What's Next?</Text>
          <Text style={styles.actionDesc}>
            Based on your results, explore the learning modules to strengthen your skills and mindset!
          </Text>
          
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  resultsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  resultBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6F42C1',
  },
  resultType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F42C1',
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionSection: {
    marginTop: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  actionDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#6F42C1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});