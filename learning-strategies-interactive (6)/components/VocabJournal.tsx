import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from './Header';
import { supabase } from '../app/lib/supabase';
import { useAuth } from './AuthContext';

interface VocabWord {
  id: string;
  word: string;
  meaning: string;
  sentence: string;
  tag: string;
  understood: boolean;
  strategy_completed: boolean;
  created_at: string;
}

export default function VocabJournal() {
  const { user } = useAuth();
  const [words, setWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('vocab_words')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setWords(data || []);
    } catch (error) {
      console.error('Error loading words:', error);
      Alert.alert('Error', 'Failed to load vocabulary words');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = () => {
    router.push('/add-vocab-word');
  };

  const handleWordPress = (wordId: string) => {
    router.push(`/vocab-word/${wordId}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="My Vocab Journal" showBack />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading words...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Words I'm Learning" showBack />
      
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddWord}>
          <Text style={styles.addButtonText}>+ Add New Word</Text>
        </TouchableOpacity>
        
        {words.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📚 No words yet!</Text>
            <Text style={styles.emptySubtext}>Tap "Add New Word" to start building your vocabulary journal.</Text>
          </View>
        ) : (
          <View style={styles.wordsList}>
            {words.map((word) => (
              <TouchableOpacity
                key={word.id}
                style={styles.wordCard}
                onPress={() => handleWordPress(word.id)}
              >
                <View style={styles.wordHeader}>
                  <Text style={styles.wordTitle}>{word.word}</Text>
                  {word.understood && <Text style={styles.understoodBadge}>✅</Text>}
                </View>
                <Text style={styles.wordMeaning} numberOfLines={1}>
                  {word.meaning}
                </Text>
                {word.tag && (
                  <Text style={styles.wordTag}>{word.tag}</Text>
                )}
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>
                    Strategy: {word.strategy_completed ? 'Complete' : 'In Progress'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 24,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  wordsList: {
    gap: 12,
  },
  wordCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  understoodBadge: {
    fontSize: 16,
  },
  wordMeaning: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  wordTag: {
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
  },
});