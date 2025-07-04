import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.warn('Header image failed to load');
    setImageError(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          {!imageError && (
            <Image 
              source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/685aa68419b8363c99a2810b_1750842272428_7dafa29e.png' }}
              style={styles.mascotImage}
              resizeMode="contain"
              onError={handleImageError}
            />
          )}
          {imageError && (
            <View style={[styles.mascotImage, styles.fallbackImage]}>
              <Text style={styles.fallbackText}>📚</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#667eea',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mascotImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  fallbackImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
});