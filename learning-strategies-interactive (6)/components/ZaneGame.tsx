import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { styles } from './ZaneGameStyles';
import { router } from 'expo-router';

interface ZaneGameProps {
  onComplete: () => void;
}

export default function ZaneGame({ onComplete }: ZaneGameProps) {
  const [currentScene, setCurrentScene] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const nextScene = () => {
    if (currentScene < 4) {
      setCurrentScene(currentScene + 1);
      setShowHint(false);
      setUserInput('');
    } else {
      showFinalScore();
    }
  };

  const handleChoice = (choice: string, isCorrect: boolean) => {
    setTotalQuestions(prev => prev + 1);
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (choice === 'unsure') {
      setShowHint(true);
    } else {
      setTimeout(nextScene, 1500);
    }
  };

  const showFinalScore = () => {
    const percentage = Math.round((score / totalQuestions) * 100);
    Alert.alert(
      'Great job! 🏆',
      `Your Score: ${score}/${totalQuestions} (${percentage}%)\n\nYou've completed Zane's Adventure!`,
      [{ text: 'Continue', onPress: onComplete }]
    );
  };

  const toggleHabit = (habit: string) => {
    setSelectedHabits(prev => 
      prev.includes(habit) 
        ? prev.filter(h => h !== habit)
        : [...prev, habit]
    );
  };

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return (
          <View style={styles.scene}>
            <Text style={styles.title}>🎒 Scene 1: The Sentence on the Board</Text>
            <Text style={styles.narration}>
              Zane walks into English class. On the board is a sentence:
            </Text>
            <View style={styles.sentenceBox}>
              <Text style={styles.sentence}>"The feline leaped through the open window."</Text>
            </View>
            <Text style={styles.instruction}>
              Read the sentence silently. Say the words in your mind using your inner voice.
            </Text>
            <TouchableOpacity style={styles.button} onPress={nextScene}>
              <Text style={styles.buttonText}>I've said the words in my head</Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.scene}>
            <Text style={styles.title}>🖼️ Scene 2: Picture It</Text>
            <Text style={styles.narration}>
              Zane pictures what he just read. What do you see?
            </Text>
            {showHint && (
              <View style={styles.hint}>
                <Text style={styles.hintText}>
                  💡 Use the understanding strategy: Look up the word or ask someone what it means. Try again!
                </Text>
              </View>
            )}
            <View style={styles.choices}>
              <TouchableOpacity 
                style={styles.choiceButton} 
                onPress={() => handleChoice('cat', true)}
              >
                <Text style={styles.choiceText}>🐱 A small cat jumping through a classroom window</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.choiceButton} 
                onPress={() => handleChoice('lion', false)}
              >
                <Text style={styles.choiceText}>🦁 A lion roaring through a window</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.choiceButton} 
                onPress={() => handleChoice('dog', false)}
              >
                <Text style={styles.choiceText}>🐕 A dog running through a door</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.choiceButton} 
                onPress={() => handleChoice('unsure', false)}
              >
                <Text style={styles.choiceText}>❓ I'm not sure what 'feline' means</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.scene}>
            <Text style={styles.title}>✏️ Scene 3: Describe the Picture</Text>
            <Text style={styles.narration}>
              Zane adds detail to the image in his mind.
            </Text>
            <Text style={styles.instruction}>Choose a detailed sentence or write your own:</Text>
            
            <TouchableOpacity 
              style={styles.choiceButton} 
              onPress={() => handleChoice('detailed', true)}
            >
              <Text style={styles.choiceText}>"A small black cat leapt through a classroom window with fluttering curtains."</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.choiceButton} 
              onPress={() => handleChoice('wrong', false)}
            >
              <Text style={styles.choiceText}>"A wild cheetah smashed through a glass wall."</Text>
            </TouchableOpacity>
            
            <Text style={styles.orText}>OR</Text>
            
            <TextInput
              style={styles.textInput}
              placeholder="Describe what you see in your mind..."
              value={userInput}
              onChangeText={setUserInput}
              multiline
            />
            
            <TouchableOpacity style={styles.button} onPress={nextScene}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 4:
        const habits = [
          'I will create pictures in my mind when reading',
          'I will stop and look up words I don\'t understand', 
          'I will describe what I see or even draw it'
        ];

        return (
          <View style={styles.scene}>
            <Text style={styles.title}>💡 Scene 4: Build the Habit</Text>
            <Text style={styles.narration}>
              Zane learned something big: "If I picture it, I understand better!"
            </Text>
            <Text style={styles.instruction}>
              Which habits will you try from now on?
            </Text>
            
            {habits.map((habit, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.habitButton,
                  selectedHabits.includes(habit) && styles.selectedHabit
                ]}
                onPress={() => toggleHabit(habit)}
              >
                <Text style={[
                  styles.habitText,
                  selectedHabits.includes(habit) && styles.selectedHabitText
                ]}>
                  {selectedHabits.includes(habit) ? '✅' : '☐'} {habit}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={[styles.button, selectedHabits.length === 0 && styles.disabledButton]} 
              onPress={() => showFinalScore()}
              disabled={selectedHabits.length === 0}
            >
              <Text style={styles.buttonText}>Complete Adventure</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  const displayScene = currentScene === 4 && selectedHabits.length > 0 ? 'Complete!' : `Scene ${currentScene} of 4`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progress}>
        <Text style={styles.progressText}>{displayScene}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentScene / 4) * 100}%` }]} />
        </View>
      </View>
      {renderScene()}
    </ScrollView>
  );
}