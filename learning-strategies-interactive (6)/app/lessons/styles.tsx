import { StyleSheet } from 'react-native';

export const lessonStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#667eea', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 15 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', flex: 1 },
  content: { flex: 1, padding: 20 },
  lessonContent: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 30 },
  exerciseSection: { backgroundColor: '#f0f8ff', padding: 15, borderRadius: 10, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#667eea' },
  exerciseTitle: { fontSize: 18, fontWeight: 'bold', color: '#667eea', marginBottom: 10 },
  exerciseText: { fontSize: 16, lineHeight: 22, color: '#555' },
  completeButton: { backgroundColor: '#27ae60', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 30 },
  activityButton: { backgroundColor: '#ff6b35', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  completeIcon: { marginRight: 10 },
  completeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 50 },
  homeButton: { backgroundColor: '#667eea', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  homeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});