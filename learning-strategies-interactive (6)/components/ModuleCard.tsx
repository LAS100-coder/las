import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ModuleCardProps {
  title: string;
  description: string;
  gradient: string[];
  onPress: () => void;
}

export default function ModuleCard({ title, description, gradient, onPress }: ModuleCardProps) {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: gradient[0] }]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit={true}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, y: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 20,
    minHeight: 100,
  },
  content: {
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 22,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    flexShrink: 1,
  },
});