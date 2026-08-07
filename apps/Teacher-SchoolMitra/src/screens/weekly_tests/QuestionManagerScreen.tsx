import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import {
  ChevronLeft,
  Plus,
  HelpCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  Save,
  X,
  FileText,
  Sparkles
} from 'lucide-react-native';

export default function QuestionManagerScreen({ route, navigation }: any) {
  const testTitle = route?.params?.test?.title || route?.params?.testTitle || 'Weekly Test #5 — Polynomials';

  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      num: 1,
      text: 'What is the degree of the polynomial 4x³ + 2x² - 7x + 1?',
      type: 'MCQ',
      points: 2,
      options: ['1', '2', '3', '4'],
      correctOption: 2 // Index of '3'
    },
    {
      id: 'q2',
      num: 2,
      text: 'If (x - 2) is a factor of x² + kx + 4, what is the value of k?',
      type: 'MCQ',
      points: 3,
      options: ['-4', '-2', '2', '4'],
      correctOption: 0 // Index of '-4'
    },
    {
      id: 'q3',
      num: 3,
      text: 'State whether true or false: Every linear polynomial has exactly one real zero.',
      type: 'True/False',
      points: 2,
      options: ['True', 'False'],
      correctOption: 0
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctKey, setCorrectKey] = useState(0);
  const [points, setPoints] = useState('2');

  const totalPointsAdded = questions.reduce((acc, item) => acc + item.points, 0);

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) {
      Alert.alert('Validation Error', 'Please enter question text.');
      return;
    }

    const newQ = {
      id: `q_${Date.now()}`,
      num: questions.length + 1,
      text: newQuestionText,
      type: 'MCQ',
      points: parseInt(points) || 2,
      options: [optA || 'Option A', optB || 'Option B', optC || 'Option C', optD || 'Option D'],
      correctOption: correctKey
    };

    setQuestions([...questions, newQ]);
    setIsModalVisible(false);
    // Reset form
    setNewQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSaveQuestions = () => {
    Alert.alert('Question Paper Saved ✅', `Added ${questions.length} questions totaling ${totalPointsAdded} marks to "${testTitle}".`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Question Manager</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setIsModalVisible(true)}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* TEST SUMMARY HERO BANNER */}
      <View style={styles.heroCard}>
        <Text style={styles.heroSub}>Question Bank</Text>
        <Text style={styles.heroTitle}>{testTitle}</Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {questions.length} Questions • {totalPointsAdded} Marks Total
          </Text>
        </View>
      </View>

      {/* QUESTIONS LIST */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {questions.map((q, index) => (
          <View key={q.id} style={styles.qCard}>
            <View style={styles.qHeader}>
              <View style={styles.qBadge}>
                <Text style={styles.qBadgeText}>Q{index + 1}</Text>
              </View>
              <Text style={styles.typeTag}>{q.type}</Text>
              <View style={styles.pointsTag}>
                <Text style={styles.pointsText}>{q.points} Pts</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteQuestion(q.id)}>
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>

            <Text style={styles.qText}>{q.text}</Text>

            <View style={styles.optionsGrid}>
              {q.options.map((opt, oIdx) => {
                const isCorrect = oIdx === q.correctOption;
                return (
                  <View
                    key={oIdx}
                    style={[styles.optionPill, isCorrect && styles.correctOptionPill]}
                  >
                    <Text style={[styles.optionKey, isCorrect && styles.correctOptionText]}>
                      {String.fromCharCode(65 + oIdx)}.
                    </Text>
                    <Text style={[styles.optionText, isCorrect && styles.correctOptionText]}>
                      {opt}
                    </Text>
                    {isCorrect && <CheckCircle2 size={14} color="#16a34a" style={{ marginLeft: 'auto' }} />}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FOOTER SAVE BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveQuestions}>
          <Save size={18} color="#ffffff" />
          <Text style={styles.saveBtnText}>Save Question Paper ({totalPointsAdded} Marks)</Text>
        </TouchableOpacity>
      </View>

      {/* ADD QUESTION MODAL */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Question</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <Text style={styles.label}>Question Text *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter problem or question statement..."
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                value={newQuestionText}
                onChangeText={setNewQuestionText}
              />

              <Text style={styles.label}>Options (MCQ)</Text>
              <TextInput
                style={styles.optionInput}
                placeholder="Option A"
                value={optA}
                onChangeText={setOptA}
              />
              <TextInput
                style={styles.optionInput}
                placeholder="Option B"
                value={optB}
                onChangeText={setOptB}
              />
              <TextInput
                style={styles.optionInput}
                placeholder="Option C"
                value={optC}
                onChangeText={setOptC}
              />
              <TextInput
                style={styles.optionInput}
                placeholder="Option D"
                value={optD}
                onChangeText={setOptD}
              />

              <Text style={styles.label}>Select Correct Answer Key</Text>
              <View style={styles.keyRow}>
                {['Option A', 'Option B', 'Option C', 'Option D'].map((kName, kIdx) => (
                  <TouchableOpacity
                    key={kIdx}
                    style={[styles.keyPill, correctKey === kIdx && styles.keyPillActive]}
                    onPress={() => setCorrectKey(kIdx)}
                  >
                    <Text style={[styles.keyText, correctKey === kIdx && styles.keyTextActive]}>
                      {String.fromCharCode(65 + kIdx)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Assigned Points / Marks</Text>
              <TextInput
                style={styles.pointsInput}
                value={points}
                onChangeText={setPoints}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.addQSubmitBtn} onPress={handleAddQuestion}>
                <Plus size={18} color="#ffffff" />
                <Text style={styles.addQSubmitText}>Add Question to Paper</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
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
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7c3aed',
    justify: 'center',
    alignItems: 'center'
  },
  heroCard: {
    backgroundColor: '#6d28d9',
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 18,
    padding: 16
  },
  heroSub: { fontSize: 12, fontWeight: '800', color: '#e9d5ff' },
  heroTitle: { fontSize: 16, fontWeight: '900', color: '#ffffff', marginTop: 2, marginBottom: 8 },
  progressRow: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  progressText: { fontSize: 11, fontWeight: '800', color: '#ffffff' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 14, paddingBottom: 90 },
  qCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  qHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  qBadge: { backgroundColor: '#f3e8ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  qBadgeText: { fontSize: 12, fontWeight: '900', color: '#7c3aed' },
  typeTag: { fontSize: 11, color: '#64748b', fontWeight: '700', flex: 1 },
  pointsTag: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  pointsText: { fontSize: 11, fontWeight: '800', color: '#15803d' },
  qText: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: 12, lineHeight: 20 },
  optionsGrid: { gap: 6 },
  optionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  correctOptionPill: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
  optionKey: { fontSize: 12, fontWeight: '800', color: '#64748b' },
  optionText: { fontSize: 13, color: '#334155', fontWeight: '600' },
  correctOptionText: { color: '#15803d', fontWeight: '800' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0'
  },
  saveBtn: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8
  },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#ffffff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  modalBody: { padding: 20 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#0f172a', height: 70, textAlignVertical: 'top' },
  optionInput: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, fontSize: 13, color: '#0f172a', marginBottom: 6 },
  keyRow: { flexDirection: 'row', gap: 10 },
  keyPill: { flex: 1, height: 40, backgroundColor: '#f1f5f9', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  keyPillActive: { backgroundColor: '#7c3aed' },
  keyText: { fontSize: 14, fontWeight: '800', color: '#475569' },
  keyTextActive: { color: '#ffffff' },
  pointsInput: { width: 80, height: 40, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, textAlign: 'center', fontWeight: '800', fontSize: 16 },
  addQSubmitBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#7c3aed', height: 48, borderRadius: 12, marginTop: 20 },
  addQSubmitText: { color: '#ffffff', fontWeight: '800', fontSize: 14 }
});
