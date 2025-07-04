import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

interface TaskItem {
  id: string;
  [key: string]: any;
}

interface FieldConfig {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

interface TaskSectionProps {
  title: string;
  icon: string;
  items: TaskItem[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddNew: () => void;
  onUpdateItem: (itemId: string, field: string, value: string | boolean) => void;
  onRemoveItem: (itemId: string) => void;
  fieldConfig: FieldConfig[];
  completedField: string;
}

export default function TaskSection({
  title,
  icon,
  items,
  isExpanded,
  onToggleExpand,
  onAddNew,
  onUpdateItem,
  onRemoveItem,
  fieldConfig,
  completedField
}: TaskSectionProps) {
  const completedCount = items.filter(item => item[completedField]).length;
  const totalCount = items.length;
  
  const getStatusColor = () => {
    if (completedCount === totalCount) return '#4CAF50'; // Green
    if (completedCount > 0) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.header, { borderLeftColor: getStatusColor() }]} 
        onPress={onToggleExpand}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.count}>{completedCount}/{totalCount}</Text>
          <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {items.map((item, index) => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemNumber}>#{index + 1}</Text>
                {items.length > 1 && (
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => onRemoveItem(item.id)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {fieldConfig.map(field => (
                <View key={field.key} style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <TextInput
                    style={[styles.input, field.multiline && styles.multilineInput]}
                    value={item[field.key] || ''}
                    onChangeText={(text) => onUpdateItem(item.id, field.key, text)}
                    placeholder={field.placeholder}
                    multiline={field.multiline}
                    numberOfLines={field.multiline ? 3 : 1}
                  />
                </View>
              ))}
              
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => onUpdateItem(item.id, completedField, !item[completedField])}
              >
                <View style={[styles.checkbox, item[completedField] && styles.checkboxChecked]}>
                  {item[completedField] && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>
                  {completedField === 'trained' ? 'Trained' : 'Completed'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
            <Text style={styles.addButtonText}>+ Add Another {title}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderLeftWidth: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  itemContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});