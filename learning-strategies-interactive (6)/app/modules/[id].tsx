import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { lessonData } from '../lessons/lessonData';

const moduleData: { [key: string]: { title: string; lessons: { title: string; content: string; exercise?: string; lessonId: string }[] } } = {
  '1': {
    title: 'Beliefs',
    lessons: [
      {
        title: 'What Are Beliefs?',
        content: 'Your beliefs are the way in which you understand your experiences about what you can or can\'t do. They shape how much time and energy you invest in a task—and whether you even try in the first place.',
        exercise: 'What belief do you hold about your favourite (or least favourite) subject? Write it down in your app journal today.',
        lessonId: '1-0'
      },
      {
        title: 'How Beliefs Are Structured',
        content: 'Beliefs don\'t appear out of nowhere—they are built from three kinds of reasons. Think of building a table: your beliefs are the Table top, and the reasons are the legs.',
        exercise: 'Write 3 reasons why you believe you can achieve your goal. One from your past experience, one affirmation and one expectation',
        lessonId: '1-1'
      },
      {
        title: 'Your Daily Beliefs Exercise',
        content: 'Consistency is key. Doing this every morning builds a huge library of reasons to believe in yourself.',
        lessonId: '1-2'
      },
      {
        title: 'From Beliefs to Action',
        content: 'Beliefs alone aren\'t enough—you need a simple plan that turns belief into real study habits.',
        lessonId: '1-3'
      }
    ]
  },
  '2': {
    title: 'How the Mind Works',
    lessons: [
      {
        title: 'Brain vs. Mind',
        content: 'You can think of your body like a super computer. Your brain is like the hardware (the body part in your head). Your mind is like the software (how you think, feel, remember, and imagine).',
        lessonId: '2-0'
      },
      {
        title: 'The Five Senses',
        content: 'Your mind works through five senses: Seeing, Hearing, Feeling, Taste, and Smell. Each sense works both outside (what you sense now) and inside (memory and imagination).',
        lessonId: '2-1'
      },
      {
        title: 'Achievers vs. Non Achievers',
        content: 'The difference between someone who does well and someone who tries hard but still doesn\'t do well in school is really only about how they use their senses!',
        lessonId: '2-2'
      }
    ]
  },
  '3': {
    title: 'Understanding Through Visualization',
    lessons: [
      {
        title: 'Conceptualising Through Reading',
        content: 'Conceptualising means being able to understand, picture and use the information you are reading. Learn the 4-step process for reading with understanding.',
        exercise: 'Practice with "The feline jumped through the window." Follow all 4 steps and describe your mental picture in detail.',
        lessonId: '3-0'
      },
      {
        title: 'The Power of Mental Pictures',
        content: 'Words exist because people experience ideas and concepts. When you read and create pictures in your mind, your focus improves and you remember better.',
        exercise: 'Read this sentence: "The dog ran across the field." Create a detailed mental picture adding your own details.',
        lessonId: '3-1'
      },
      {
        title: 'Novels vs Technical Information',
        content: 'Novels paint pictures for you with descriptive language. Technical information requires you to create the pictures yourself by understanding the vocabulary.',
        exercise: 'Practice with technical text: "A triangle has three sides and three angles." Create a mental picture of different types of triangles.',
        lessonId: '3-2'
      }
    ]
  },
  '4': {
    title: 'Virtual Reading',
    lessons: [
      {
        title: 'Virtual Reading Technique',
        content: 'This reading technique evolves from reading and conceptualising and it improves memory. With practice, you will be able to virtual read the information once and remember it long term.',
        exercise: 'Practice the virtual reading technique with "The feline jumped through the window." Follow all 5 steps, adding vivid imagery, sounds, and emotions.',
        lessonId: '4-0'
      }
    ]
  },
  '5': {
    title: 'How to Understand Anything',
    lessons: Object.keys(lessonData)
      .filter(key => key.startsWith('5-'))
      .map(key => ({
        title: lessonData[key].title,
        content: lessonData[key].content.substring(0, 100) + '...',
        exercise: lessonData[key].exercise,
        lessonId: key
      }))
  },
  '7': {
    title: 'The T.O.T.E Revision Method',
    lessons: [
      {
        title: 'The T.O.T.E Revision Method',
        content: 'This section will help save you time when learning and help you improve your marks.',
        lessonId: '7-0'
      }
    ]
  },
  '8': {
    title: 'Mastering Mathematics',
    lessons: [
      {
        title: 'How to Master Mathematics',
        content: 'Learn the 8-step process to master any mathematical concept using proven learning strategies.',
        exercise: 'Practice identifying mathematical terms in your current math homework. List any terms you don\'t fully understand.',
        lessonId: '8-0'
      },
      {
        title: 'Mathematical Problem Solving Steps',
        content: 'Master the specific steps for solving mathematical problems, using long addition as an example.',
        exercise: 'Practice the addition steps with 456 + 123. Write out each step in words before doing the calculation.',
        lessonId: '8-1'
      },
      {
        title: 'Examples and Practice',
        content: 'See how the steps relate to multiple examples and learn to visualize mathematical solutions.',
        exercise: 'Try solving 234 + 145 mentally using visualization. Picture the numbers on a whiteboard and work through each step.',
        lessonId: '8-2'
      }
    ]
  }
};

export default function ModuleDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const module = moduleData[id || '1'];

  if (!module) {
    return (
      <View style={styles.container}>
        <Text>Module not found</Text>
      </View>
    );
  }

  const handleLessonPress = (lesson: { lessonId: string }) => {
    router.push(`/lessons/${lesson.lessonId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{module.title}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        {module.lessons.map((lesson, index) => (
          <TouchableOpacity key={index} style={styles.lessonCard} onPress={() => handleLessonPress(lesson)}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonPreview}>{lesson.content.substring(0, 100)}...</Text>
          </TouchableOpacity>
        ))}
        
        <Text style={styles.sectionTitle}>Interactive Activities</Text>
        
        {id === '1' && (
          <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/belief-builders')}>
            <Text style={styles.gameTitle}>🏗️ Your 3 Belief Builders</Text>
            <Text style={styles.gameDescription}>Build strong beliefs with affirmations, experiences, and expectations</Text>
          </TouchableOpacity>
        )}
        
        {id === '2' && (
          <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/spelling-game')}>
            <Text style={styles.gameTitle}>🎮 Spelling Challenge</Text>
            <Text style={styles.gameDescription}>Train your brain to see words and spell them correctly</Text>
          </TouchableOpacity>
        )}
        
        {id === '3' && (
          <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/zane-game')}>
            <Text style={styles.gameTitle}>🎒 Zane's Adventure</Text>
            <Text style={styles.gameDescription}>Follow Zane's story and practice conceptualising what you read</Text>
          </TouchableOpacity>
        )}
        
        {id === '4' && (
          <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/virtual-reading-builder')}>
            <Text style={styles.gameTitle}>📚 Virtual Reading Builder</Text>
            <Text style={styles.gameDescription}>Practice the 5-step virtual reading technique to improve memory</Text>
          </TouchableOpacity>
        )}
        
        {id === '5' && (
          <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/word-builder')}>
            <Text style={styles.gameTitle}>🧠 Understand Any Word: 8-Step Builder</Text>
            <Text style={styles.gameDescription}>Guide yourself through a focused process to understand and remember new words using an 8-step sensory strategy</Text>
          </TouchableOpacity>
        )}
        
        {id === '7' && (
          <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/tote-activity')}>
            <Text style={styles.gameTitle}>🎯 Revise Like a Pro: T.O.T.E Strategy</Text>
            <Text style={styles.gameDescription}>Work through your revision by identifying what you don't know, applying learning strategies, testing again, and confidently exiting once mastered</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#667eea', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginTop: 10, color: '#333' },
  lessonCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  lessonTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  lessonPreview: { fontSize: 12, color: '#666', marginTop: 5 },
  gameCard: { backgroundColor: '#e8f4fd', padding: 20, borderRadius: 12, marginBottom: 10, borderWidth: 2, borderColor: '#667eea' },
  gameTitle: { fontSize: 18, fontWeight: 'bold', color: '#667eea', marginBottom: 8 },
  gameDescription: { fontSize: 14, color: '#555', marginBottom: 8 }
});