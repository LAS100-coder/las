import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface GoalData {
  whatYouWant: string;
  whatYouCanDo: string;
  whatYoullSee: string;
  whatYoullHear: string;
  whatYoullFeel: string;
  isGoodForOthers: boolean;
  when: string;
  where: string;
  whatWillHelp: string;
  howYoullKnow: string;
  insteadOf: string;
}

interface GoalStepProps {
  step: number;
  goalData: GoalData;
  updateGoalData: (field: keyof GoalData, value: string | boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GoalStep({ step, goalData, updateGoalData, onNext, onPrev }: GoalStepProps) {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What do you want to happen? Say it in a positive way.</Text>
            <TextInput
              style={styles.input}
              placeholder="I want to..."
              value={goalData.whatYouWant}
              onChangeText={(text) => updateGoalData('whatYouWant', text)}
              multiline
            />
          </View>
        );
      
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What can YOU do to help this happen?</Text>
            <TextInput
              style={styles.input}
              placeholder="I can..."
              value={goalData.whatYouCanDo}
              onChangeText={(text) => updateGoalData('whatYouCanDo', text)}
              multiline
            />
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What will you see, hear and feel when you reach your goal?</Text>
            <Text style={styles.subLabel}>👁️ I'll see...</Text>
            <TextInput
              style={styles.input}
              placeholder="What you'll see..."
              value={goalData.whatYoullSee}
              onChangeText={(text) => updateGoalData('whatYoullSee', text)}
              multiline
            />
            <Text style={styles.subLabel}>👂 I'll hear...</Text>
            <TextInput
              style={styles.input}
              placeholder="What you'll hear..."
              value={goalData.whatYoullHear}
              onChangeText={(text) => updateGoalData('whatYoullHear', text)}
              multiline
            />
            <Text style={styles.subLabel}>❤️ I'll feel...</Text>
            <TextInput
              style={styles.input}
              placeholder="How you'll feel..."
              value={goalData.whatYoullFeel}
              onChangeText={(text) => updateGoalData('whatYoullFeel', text)}
              multiline
            />
          </View>
        );
      
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>Will this goal help you AND the people around you?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.choiceButton, goalData.isGoodForOthers && styles.selectedButton]}
                onPress={() => updateGoalData('isGoodForOthers', true)}
              >
                <Text style={[styles.choiceText, goalData.isGoodForOthers && styles.selectedText]}>Yes ✅</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.choiceButton, !goalData.isGoodForOthers && styles.selectedButton]}
                onPress={() => updateGoalData('isGoodForOthers', false)}
              >
                <Text style={[styles.choiceText, !goalData.isGoodForOthers && styles.selectedText]}>No ❌</Text>
              </TouchableOpacity>
            </View>
            {!goalData.isGoodForOthers && (
              <Text style={styles.helpText}>Let's tweak your goal together! Think about how it can help others too.</Text>
            )}
          </View>
        );
      
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>When and where will this goal happen?</Text>
            <Text style={styles.subLabel}>📅 When?</Text>
            <TextInput
              style={styles.input}
              placeholder="When will this happen?"
              value={goalData.when}
              onChangeText={(text) => updateGoalData('when', text)}
            />
            <Text style={styles.subLabel}>📍 Where?</Text>
            <TextInput
              style={styles.input}
              placeholder="Where will this happen?"
              value={goalData.where}
              onChangeText={(text) => updateGoalData('where', text)}
            />
          </View>
        );
      
      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What tools, skills, or people will help you?</Text>
            <View style={styles.prefilledContainer}>
              <Text style={styles.prefilledText}>✅ LearnAnythingStrat App</Text>
            </View>
            <Text style={styles.subLabel}>Anything else?</Text>
            <TextInput
              style={styles.input}
              placeholder="Other tools, skills, or people..."
              value={goalData.whatWillHelp.replace('LearnAnythingStrat App', '').replace(', ', '')}
              onChangeText={(text) => updateGoalData('whatWillHelp', text ? `LearnAnythingStrat App, ${text}` : 'LearnAnythingStrat App')}
              multiline
            />
          </View>
        );
      
      case 7:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>How will you know your goal came true?</Text>
            <TextInput
              style={styles.input}
              placeholder="I'll know I did it when..."
              value={goalData.howYoullKnow}
              onChangeText={(text) => updateGoalData('howYoullKnow', text)}
              multiline
            />
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, styles.prevButton]} 
          onPress={onPrev}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.nextButton]} 
          onPress={onNext}
        >
          <Text style={styles.navButtonText}>{step === 7 ? 'Finish!' : 'Next →'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    lineHeight: 24,
  },
  subLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 50,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  choiceButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedButton: {
    borderColor: '#28A745',
    backgroundColor: '#28A745',
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  helpText: {
    marginTop: 12,
    fontSize: 14,
    color: '#FF6B35',
    fontStyle: 'italic',
  },
  prefilledContainer: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  prefilledText: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: '500',
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#6c757d',
  },
  nextButton: {
    backgroundColor: '#28A745',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});