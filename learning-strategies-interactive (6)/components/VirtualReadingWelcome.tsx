import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface VirtualReadingWelcomeProps {
  onStart: () => void;
}

const VirtualReadingWelcome: React.FC<VirtualReadingWelcomeProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📚 Virtual Reading Builder</Text>
        
        <Text style={styles.message}>
          Want to remember what you read — after reading it just once? Let's try out Virtual Reading, a powerful technique that helps you learn faster and remember longer!
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Let's Try It</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    color: '#555',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VirtualReadingWelcome;