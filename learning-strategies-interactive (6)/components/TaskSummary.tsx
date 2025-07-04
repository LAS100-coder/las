import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskSummaryProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

export default function TaskSummary({
  totalTasks,
  completedTasks,
  pendingTasks,
  overdueTasks
}: TaskSummaryProps) {
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Task Summary</Text>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${completionRate}%` }
          ]} 
        />
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={[styles.statLabel, styles.completedLabel]}>Completed</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={[styles.statLabel, styles.pendingLabel]}>Pending</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{overdueTasks}</Text>
          <Text style={[styles.statLabel, styles.overdueLabel]}>Overdue</Text>
        </View>
      </View>
      
      <Text style={styles.completionText}>
        {Math.round(completionRate)}% Complete
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  completedLabel: {
    color: '#4CAF50',
  },
  pendingLabel: {
    color: '#FF9800',
  },
  overdueLabel: {
    color: '#F44336',
  },
  completionText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});