import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeworkTaskProps {
  task: {
    id: string;
    subject: string;
    task: string;
    dueDate: string;
    estimatedTime: string;
    completed: boolean;
    strategy?: string;
  };
  onToggleComplete: (id: string) => void;
}

const subjectIcons: { [key: string]: string } = {
  'English': '📘',
  'Math': '🔢',
  'Science': '🔬',
  'History': '📜',
  'Geography': '🌍',
  'Art': '🎨',
  'Music': '🎵',
  'PE': '⚽',
  'Other': '📖'
};

export default function HomeworkTask({ task, onToggleComplete }: HomeworkTaskProps) {
  const getUrgencyColor = () => {
    const today = new Date();
    const due = new Date(task.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (task.completed) return '#4CAF50';
    if (diffDays < 0) return '#F44336';
    if (diffDays <= 1) return '#FF9800';
    return '#2196F3';
  };

  return (
    <View style={[styles.container, { borderLeftColor: getUrgencyColor() }]}>
      <View style={styles.header}>
        <Text style={styles.subjectIcon}>
          {subjectIcons[task.subject] || subjectIcons['Other']}
        </Text>
        <Text style={styles.subject}>{task.subject}</Text>
        <TouchableOpacity 
          style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
          onPress={() => onToggleComplete(task.id)}
        >
          <Text style={styles.checkmark}>{task.completed ? '✓' : ''}</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.taskText, task.completed && styles.taskCompleted]}>
        {task.task}
      </Text>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>Due: {task.dueDate}</Text>
        <Text style={styles.detailText}>Time: {task.estimatedTime}</Text>
      </View>
      
      {task.strategy && (
        <Text style={styles.strategy}>Strategy: {task.strategy}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 12,
    color: '#999',
  },
  strategy: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontStyle: 'italic',
  },
});