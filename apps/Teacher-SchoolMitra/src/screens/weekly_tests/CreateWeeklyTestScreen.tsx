import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react-native';

export default function CreateWeeklyTestScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [selectedClass, setSelectedClass] = useState('Class 8-A');
  const [subject, setSubject] = useState('Mathematics');
  const [testDate, setTestDate] = useState('2026-08-15');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 09:45 AM');
  const [duration, setDuration] = useState('45');
  const [totalMarks, setTotalMarks] = useState('25');
  const [passingMarks, setPassingMarks] = useState('10');
  const [testMode, setTestMode] = useState<'Online MCQ' | 'Pen & Paper'>('Online MCQ');
  const [instructions, setInstructions] = useState('');

  const classes = ['Class 8-A', 'Class 9-B', 'Class 10-C'];
  const subjects = ['Mathematics', 'Algebra', 'Geometry', 'Physics'];

  const handleNext = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a test title.');
      return;
    }

    Alert.alert(
      'Weekly Test Scheduled 🎉',
      `"${title}" scheduled for ${selectedClass} on ${testDate}. Proceed to add questions!`,
      [
        {
          text: 'Manage Questions Now',
          onPress: () => navigation.navigate('QuestionManager', { testTitle: title, totalMarks })
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Weekly Test</Text>
        <HelpCircle size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Test Details</Text>

        {/* TARGET CLASS */}
        <Text style={styles.label}>Target Class *</Text>
        <View style={styles.pillRow}>
          {classes.map((cls) => (
            <TouchableOpacity
              key={cls}
              style={[styles.selectorPill, selectedClass === cls && styles.selectorPillActive]}
              onPress={() => setSelectedClass(cls)}
            >
              <Text style={[styles.selectorPillText, selectedClass === cls && styles.selectorPillTextActive]}>
                {cls}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SUBJECT */}
        <Text style={styles.label}>Subject *</Text>
        <View style={styles.pillRow}>
          {subjects.map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[styles.selectorPill, subject === sub && styles.selectorPillActive]}
              onPress={() => setSubject(sub)}
            >
              <Text style={[styles.selectorPillText, subject === sub && styles.selectorPillTextActive]}>
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TEST MODE SELECTOR */}
        <Text style={styles.label}>Test Delivery Format</Text>
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeCard, testMode === 'Online MCQ' && styles.modeCardActive]}
            onPress={() => setTestMode('Online MCQ')}
          >
            <Text style={[styles.modeTitle, testMode === 'Online MCQ' && styles.modeTitleActive]}>
              Online MCQ Test
            </Text>
            <Text style={styles.modeSub}>Students take test on Mobile App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, testMode === 'Pen & Paper' && styles.modeCardActive]}
            onPress={() => setTestMode('Pen & Paper')}
          >
            <Text style={[styles.modeTitle, testMode === 'Pen & Paper' && styles.modeTitleActive]}>
              Pen & Paper Sheet
            </Text>
            <Text style={styles.modeSub}>Conduct in class & enter marks manually</Text>
          </TouchableOpacity>
        </View>

        {/* TITLE */}
        <Text style={styles.label}>Test Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Weekly Test #5 — Polynomials & Factoring"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
        />

        {/* DATE & TIME ROW */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Test Date *</Text>
            <TextInput
              style={styles.input}
              value={testDate}
              onChangeText={setTestDate}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Duration (Mins) *</Text>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* MARKS ROW */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Total Marks *</Text>
            <TextInput
              style={styles.input}
              value={totalMarks}
              onChangeText={setTotalMarks}
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Passing Marks *</Text>
            <TextInput
              style={styles.input}
              value={passingMarks}
              onChangeText={setPassingMarks}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* SYLLABUS & INSTRUCTIONS */}
        <Text style={styles.label}>Syllabus Covered & Test Instructions</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Topics included: Chapter 3.1 - 3.4. Negative marking: None..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={3}
          value={instructions}
          onChangeText={setInstructions}
        />

        {/* SUBMIT ACTION */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>Proceed to Question Manager</Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6, marginTop: 10 },
  pillRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 6 },
  selectorPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },
  selectorPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  selectorPillText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  selectorPillTextActive: { color: '#ffffff' },
  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  modeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0'
  },
  modeCardActive: { borderColor: '#7c3aed', backgroundColor: '#f3e8ff' },
  modeTitle: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  modeTitleActive: { color: '#7c3aed' },
  modeSub: { fontSize: 10, color: '#64748b', marginTop: 2 },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#0f172a'
  },
  row: { flexDirection: 'row', gap: 12 },
  textArea: { height: 80, textAlignVertical: 'top', paddingTop: 12 },
  nextBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    height: 52,
    borderRadius: 14,
    marginTop: 24,
    marginBottom: 20
  },
  nextBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 15 }
});
