import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

interface AddTaskFormProps {
  onAddTask: (task: {
    subject: string;
    task: string;
    dueDate: string;
    estimatedTime: string;
    strategy?: string;
  }) => void;
  onCancel: () => void;
}

const subjects = ['English', 'Math', 'Science', 'History', 'Geography', 'Art', 'Music', 'PE', 'Other'];
const timeOptions = ['15 min', '30 min', '45 min', '1 hour', '1.5 hours', '2 hours', '2+ hours'];
const strategies = ['Conceptualising', 'Memory', 'Planning', 'Virtual Reading', 'Active Reading', 'Note Taking'];

export default function AddTaskForm({ onAddTask, onCancel }: AddTaskFormProps) {
  const [subject, setSubject] = useState('English');
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('30 min');
  const [strategy, setStrategy] = useState('');
  const [showSubjects, setShowSubjects] = useState(false);
  const [showTimes, setShowTimes] = useState(false);
  const [showStrategies, setShowStrategies] = useState(false);

  const handleSubmit = () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Please enter a task description');
      return;
    }
    if (!dueDate.trim()) {
      Alert.alert('Error', 'Please enter a due date');
      return;
    }

    onAddTask({
      subject,
      task: task.trim(),
      dueDate: dueDate.trim(),
      estimatedTime,
      strategy: strategy || undefined
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      
      <Text style={styles.label}>Subject</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setShowSubjects(!showSubjects)}
      >
        <Text style={styles.dropdownText}>{subject}</Text>
        <Text style={styles.arrow}>{showSubjects ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showSubjects && (
        <View style={styles.options}>
          {subjects.map(subj => (
            <TouchableOpacity
              key={subj}
              style={styles.option}
              onPress={() => {
                setSubject(subj);
                setShowSubjects(false);
              }}
            >
              <Text style={styles.optionText}>{subj}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Task/Assignment</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Enter task description..."
        multiline
      />

      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Estimated Time</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setShowTimes(!showTimes)}
      >
        <Text style={styles.dropdownText}>{estimatedTime}</Text>
        <Text style={styles.arrow}>{showTimes ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showTimes && (
        <View style={styles.options}>
          {timeOptions.map(time => (
            <TouchableOpacity
              key={time}
              style={styles.option}
              onPress={() => {
                setEstimatedTime(time);
                setShowTimes(false);
              }}
            >
              <Text style={styles.optionText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Strategy (Optional)</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setShowStrategies(!showStrategies)}
      >
        <Text style={styles.dropdownText}>{strategy || 'Select strategy...'}</Text>
        <Text style={styles.arrow}>{showStrategies ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showStrategies && (
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              setStrategy('');
              setShowStrategies(false);
            }}
          >
            <Text style={styles.optionText}>None</Text>
          </TouchableOpacity>
          {strategies.map(strat => (
            <TouchableOpacity
              key={strat}
              style={styles.option}
              onPress={() => {
                setStrategy(strat);
                setShowStrategies(false);
              }}
            >
              <Text style={styles.optionText}>{strat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.addText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  options: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});