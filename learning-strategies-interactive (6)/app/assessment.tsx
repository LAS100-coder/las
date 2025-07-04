import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import AssessmentQuestion from '../components/AssessmentQuestion';
import AssessmentResults from '../components/AssessmentResults';

type Answer = 'A' | 'B' | 'C' | null;

const sensoryQuestions = [
  {
    id: 1,
    title: 'Spelling',
    question: 'When I try to spell a difficult word…',
    options: [
      { key: 'A' as const, text: 'I see the word in my mind and read it visually. (Visual)' },
      { key: 'B' as const, text: 'I sound it out or hear it in my head. (Auditory)' },
      { key: 'C' as const, text: 'I write it out or trace it with my finger to feel it. (Kinesthetic)' }
    ]
  },
  {
    id: 2,
    title: 'Reading',
    question: 'When I read a passage for comprehension…',
    options: [
      { key: 'A' as const, text: 'I visualize what I\'m reading as a movie or picture. (Visual)' },
      { key: 'B' as const, text: 'I hear the words clearly in my mind. (Auditory)' },
      { key: 'C' as const, text: 'I get a sense or feeling of the meaning behind the words. (Kinesthetic)' }
    ]
  },
  {
    id: 3,
    title: 'Understanding',
    question: 'When I want to understand something new…',
    options: [
      { key: 'A' as const, text: 'I look at diagrams, maps, or videos. (Visual)' },
      { key: 'B' as const, text: 'I listen to explanations or talk it through. (Auditory)' },
      { key: 'C' as const, text: 'I need to do it, build it, or physically engage with it. (Kinesthetic)' }
    ]
  },
  {
    id: 4,
    title: 'Memorizing',
    question: 'To remember a list of items…',
    options: [
      { key: 'A' as const, text: 'I picture the items in my mind. (Visual)' },
      { key: 'B' as const, text: 'I repeat the list aloud or in my mind. (Auditory)' },
      { key: 'C' as const, text: 'I associate each item with a movement or feeling. (Kinesthetic)' }
    ]
  },
  {
    id: 5,
    title: 'Remembering',
    question: 'When trying to remember past events…',
    options: [
      { key: 'A' as const, text: 'I see the images in my mind, like a photo or movie. (Visual)' },
      { key: 'B' as const, text: 'I hear voices or sounds from the event. (Auditory)' },
      { key: 'C' as const, text: 'I remember how I felt or what I was doing physically. (Kinesthetic)' }
    ]
  }
];

const beliefsQuestions = [
  {
    id: 6,
    title: 'Belief in Learning Ability',
    question: 'When I think about learning something new…',
    options: [
      { key: 'A' as const, text: 'I believe I can learn it if I try hard enough. (Growth mindset)' },
      { key: 'B' as const, text: 'I\'m not sure — it depends if I\'m "good at it" or not. (Neutral)' },
      { key: 'C' as const, text: 'I often doubt my ability and feel like I\'ll fail. (Fixed mindset)' }
    ]
  },
  {
    id: 7,
    title: 'Reactions to Mistakes',
    question: 'When I make a mistake while studying…',
    options: [
      { key: 'A' as const, text: 'I see it as a chance to improve and learn. (Positive belief)' },
      { key: 'B' as const, text: 'I feel discouraged but try to move on. (Mixed belief)' },
      { key: 'C' as const, text: 'I feel like I\'m just not cut out for the subject. (Negative belief)' }
    ]
  },
  {
    id: 8,
    title: 'Study Organization',
    question: 'How do you usually organize your studies?',
    options: [
      { key: 'A' as const, text: 'I use planners, apps, or checklists to track tasks and progress. (Well organized)' },
      { key: 'B' as const, text: 'I sometimes make a plan, but often forget to follow it. (Partially organized)' },
      { key: 'C' as const, text: 'I don\'t really have a system — I just go with the flow. (Disorganized)' }
    ]
  },
  {
    id: 9,
    title: 'Goal-Setting',
    question: 'How do you set academic goals?',
    options: [
      { key: 'A' as const, text: 'I break them into steps and track my progress. (Structured and proactive)' },
      { key: 'B' as const, text: 'I set general goals, but don\'t always follow up. (Inconsistent)' },
      { key: 'C' as const, text: 'I don\'t really set learning goals. (Unstructured)' }
    ]
  },
  {
    id: 10,
    title: 'Study Reflection',
    question: 'At the end of a study session…',
    options: [
      { key: 'A' as const, text: 'I reflect on what I\'ve learned and what to do next. (Self-aware learner)' },
      { key: 'B' as const, text: 'I sometimes think about it but not regularly. (Occasional reflection)' },
      { key: 'C' as const, text: 'I usually just finish and forget about it. (No reflection)' }
    ]
  }
];

export default function Assessment() {
  const [currentSection, setCurrentSection] = useState<'intro' | 'sensory' | 'beliefs' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sensoryAnswers, setSensoryAnswers] = useState<Answer[]>(new Array(5).fill(null));
  const [beliefsAnswers, setBeliefsAnswers] = useState<Answer[]>(new Array(5).fill(null));

  const handleSensoryAnswer = (answer: Answer) => {
    const newAnswers = [...sensoryAnswers];
    newAnswers[currentQuestion] = answer;
    setSensoryAnswers(newAnswers);
    
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentSection('beliefs');
      setCurrentQuestion(0);
    }
  };

  const handleBeliefsAnswer = (answer: Answer) => {
    const newAnswers = [...beliefsAnswers];
    newAnswers[currentQuestion] = answer;
    setBeliefsAnswers(newAnswers);
    
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentSection('results');
    }
  };

  const startAssessment = () => {
    setCurrentSection('sensory');
    setCurrentQuestion(0);
  };

  if (currentSection === 'intro') {
    return (
      <View style={styles.container}>
        <Header title="🧠 Learning Assessment" subtitle="Discover your learning style" />
        <ScrollView style={styles.content}>
          <View style={styles.introCard}>
            <Text style={styles.introTitle}>Welcome to Your Learning Assessment!</Text>
            <Text style={styles.introText}>This assessment has two parts:</Text>
            <Text style={styles.sectionTitle}>🧠 Part 1: Sensory Modality Assessment</Text>
            <Text style={styles.sectionDesc}>
              Identify which sensory systems you rely on most when processing information for learning and recall.
            </Text>
            <Text style={styles.sectionTitle}>📚 Part 2: Beliefs & Study Organization</Text>
            <Text style={styles.sectionDesc}>
              Discover your learning beliefs and study habits.
            </Text>
            <Text style={styles.instructions}>
              For each question, choose the option that best describes how you naturally perform that task. Be honest and go with your first instinct.
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={startAssessment}>
              <Text style={styles.startButtonText}>Start Assessment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (currentSection === 'results') {
    return (
      <View style={styles.container}>
        <Header title="🎉 Assessment Complete" subtitle="Your personalized results" />
        <AssessmentResults sensoryAnswers={sensoryAnswers} beliefsAnswers={beliefsAnswers} />
      </View>
    );
  }

  const questions = currentSection === 'sensory' ? sensoryQuestions : beliefsQuestions;
  const currentQ = questions[currentQuestion];
  const handleAnswer = currentSection === 'sensory' ? handleSensoryAnswer : handleBeliefsAnswer;

  return (
    <View style={styles.container}>
      <Header 
        title={currentSection === 'sensory' ? '🧠 Sensory Assessment' : '📚 Beliefs Assessment'} 
        subtitle={`Question ${currentQuestion + 1} of 5`} 
      />
      <View style={styles.content}>
        <AssessmentQuestion
          title={currentQ.title}
          question={currentQ.question}
          options={currentQ.options}
          onAnswer={handleAnswer}
        />
      </View>
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
  introCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#6F42C1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});