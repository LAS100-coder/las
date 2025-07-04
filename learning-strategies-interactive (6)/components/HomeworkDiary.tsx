import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskSection from './TaskSection';
import TaskSummary from './TaskSummary';

interface TaskItem {
  id: string;
  [key: string]: any;
}

interface TaskData {
  subject: TaskItem[];
  projectDueBy: TaskItem[];
  projectPlan: TaskItem[];
  testDate: TaskItem[];
  sport: TaskItem[];
  socialEvents: TaskItem[];
  revisedSubject: TaskItem[];
  other: TaskItem[];
}

const createInitialItem = (type: string): TaskItem => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  switch (type) {
    case 'subject':
      return { id, description: '', completed: false };
    case 'projectDueBy':
      return { id, description: '', dailyTask: '', completed: false };
    case 'projectPlan':
      return { id, text: '', completed: false };
    case 'testDate':
      return { id, criteria: '', goal: '', completed: false };
    case 'sport':
      return { id, eventDate: '', trained: false };
    case 'socialEvents':
      return { id, preparation: '', completed: false };
    case 'revisedSubject':
      return { id, criteria: '', completed: false };
    case 'other':
      return { id, input: '', completed: false };
    default:
      return { id, completed: false };
  }
};

const initialTaskData: TaskData = {
  subject: [createInitialItem('subject')],
  projectDueBy: [createInitialItem('projectDueBy')],
  projectPlan: [createInitialItem('projectPlan')],
  testDate: [createInitialItem('testDate')],
  sport: [createInitialItem('sport')],
  socialEvents: [createInitialItem('socialEvents')],
  revisedSubject: [createInitialItem('revisedSubject')],
  other: [createInitialItem('other')],
};

export default function HomeworkDiary() {
  const [taskData, setTaskData] = useState<TaskData>(initialTaskData);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('homeworkDiaryTasks');
      if (saved) {
        setTaskData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newData: TaskData) => {
    try {
      await AsyncStorage.setItem('homeworkDiaryTasks', JSON.stringify(newData));
      setTaskData(newData);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addNewItem = (sectionKey: keyof TaskData) => {
    const newItem = createInitialItem(sectionKey);
    const newData = {
      ...taskData,
      [sectionKey]: [...taskData[sectionKey], newItem]
    };
    saveTasks(newData);
  };

  const updateItem = (sectionKey: keyof TaskData, itemId: string, field: string, value: string | boolean) => {
    const newData = {
      ...taskData,
      [sectionKey]: taskData[sectionKey].map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    };
    saveTasks(newData);
  };

  const removeItem = (sectionKey: keyof TaskData, itemId: string) => {
    if (taskData[sectionKey].length <= 1) return; // Keep at least one item
    
    const newData = {
      ...taskData,
      [sectionKey]: taskData[sectionKey].filter(item => item.id !== itemId)
    };
    saveTasks(newData);
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  const getTaskStats = () => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    Object.values(taskData).forEach(items => {
      items.forEach(item => {
        totalTasks++;
        if (item.completed || item.trained) {
          completedTasks++;
        }
      });
    });
    
    const pendingTasks = totalTasks - completedTasks;
    const overdueTasks = 0; // Could be enhanced with due dates
    
    return { totalTasks, completedTasks, pendingTasks, overdueTasks };
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TaskSummary {...getTaskStats()} />
        
        <TaskSection
          title="Subject"
          icon="📚"
          items={taskData.subject}
          isExpanded={expandedSections.includes('subject')}
          onToggleExpand={() => toggleSection('subject')}
          onAddNew={() => addNewItem('subject')}
          onUpdateItem={(itemId, field, value) => updateItem('subject', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('subject', itemId)}
          fieldConfig={[
            { key: 'description', label: 'Task Description', placeholder: 'Enter task description...' }
          ]}
          completedField="completed"
        />
        
        <TaskSection
          title="Project Due By"
          icon="📅"
          items={taskData.projectDueBy}
          isExpanded={expandedSections.includes('projectDueBy')}
          onToggleExpand={() => toggleSection('projectDueBy')}
          onAddNew={() => addNewItem('projectDueBy')}
          onUpdateItem={(itemId, field, value) => updateItem('projectDueBy', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('projectDueBy', itemId)}
          fieldConfig={[
            { key: 'description', label: 'Project Description', placeholder: 'Enter project description...' },
            { key: 'dailyTask', label: 'Daily Task Description', placeholder: 'Enter daily task...' }
          ]}
          completedField="completed"
        />
        
        <TaskSection
          title="Project Plan"
          icon="📋"
          items={taskData.projectPlan}
          isExpanded={expandedSections.includes('projectPlan')}
          onToggleExpand={() => toggleSection('projectPlan')}
          onAddNew={() => addNewItem('projectPlan')}
          onUpdateItem={(itemId, field, value) => updateItem('projectPlan', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('projectPlan', itemId)}
          fieldConfig={[
            { key: 'text', label: 'Plan Details', placeholder: 'Enter project plan...', multiline: true }
          ]}
          completedField="completed"
        />
        
        <TaskSection
          title="Test Date"
          icon="📝"
          items={taskData.testDate}
          isExpanded={expandedSections.includes('testDate')}
          onToggleExpand={() => toggleSection('testDate')}
          onAddNew={() => addNewItem('testDate')}
          onUpdateItem={(itemId, field, value) => updateItem('testDate', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('testDate', itemId)}
          fieldConfig={[
            { key: 'criteria', label: 'Test Criteria', placeholder: 'Enter test criteria...' },
            { key: 'goal', label: 'Goal', placeholder: 'Enter your goal...' }
          ]}
          completedField="completed"
        />
        
        <TaskSection
          title="Sport"
          icon="⚽"
          items={taskData.sport}
          isExpanded={expandedSections.includes('sport')}
          onToggleExpand={() => toggleSection('sport')}
          onAddNew={() => addNewItem('sport')}
          onUpdateItem={(itemId, field, value) => updateItem('sport', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('sport', itemId)}
          fieldConfig={[
            { key: 'eventDate', label: 'Event Date', placeholder: 'Enter event date...' }
          ]}
          completedField="trained"
        />
        
        <TaskSection
          title="Social Events"
          icon="🎉"
          items={taskData.socialEvents}
          isExpanded={expandedSections.includes('socialEvents')}
          onToggleExpand={() => toggleSection('socialEvents')}
          onAddNew={() => addNewItem('socialEvents')}
          onUpdateItem={(itemId, field, value) => updateItem('socialEvents', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('socialEvents', itemId)}
          fieldConfig={[
            { key: 'preparation', label: 'Preparation/Duties', placeholder: 'Enter preparation details...', multiline: true }
          ]}
          completedField="completed"
        />
        
        <TaskSection
          title="Revised Subject"
          icon="🔄"
          items={taskData.revisedSubject}
          isExpanded={expandedSections.includes('revisedSubject')}
          onToggleExpand={() => toggleSection('revisedSubject')}
          onAddNew={() => addNewItem('revisedSubject')}
          onUpdateItem={(itemId, field, value) => updateItem('revisedSubject', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('revisedSubject', itemId)}
          fieldConfig={[
            { key: 'criteria', label: 'Revision Criteria', placeholder: 'Enter revision criteria...', multiline: true }
          ]}
          completedField="completed"
        />
        
        <TaskSection
          title="Other"
          icon="📌"
          items={taskData.other}
          isExpanded={expandedSections.includes('other')}
          onToggleExpand={() => toggleSection('other')}
          onAddNew={() => addNewItem('other')}
          onUpdateItem={(itemId, field, value) => updateItem('other', itemId, field, value)}
          onRemoveItem={(itemId) => removeItem('other', itemId)}
          fieldConfig={[
            { key: 'input', label: 'Free Input', placeholder: 'Enter any other tasks...', multiline: true }
          ]}
          completedField="completed"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
});