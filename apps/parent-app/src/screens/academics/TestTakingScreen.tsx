import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TestTakingScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { title } = route.params || { title: "Science Weekly Test 4" };

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const questions = [
    { id: 1, text: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"] },
    { id: 2, text: "Which essential gas do plants absorb from the atmosphere during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"] },
    { id: 3, text: "What is the standard chemical symbol for Gold in the periodic table?", options: ["Ag", "Au", "Pb", "Fe"] }
  ];

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentQ]: option });
  };

  const handleSubmit = () => {
    Alert.alert(
      "Submit Assessment",
      "Are you sure you want to finish and submit your test?",
      [
        { text: "Continue Test", style: "cancel" },
        { 
          text: "Confirm Submit", 
          onPress: () => {
            Alert.alert("Success 🎉", "Test submitted successfully!", [
              { text: "Done", onPress: () => navigation.goBack() }
            ]);
          }
        }
      ]
    );
  };

  const q = questions[currentQ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Top Banner & Timer */}
      <LinearGradient colors={['#1e3a8a', '#2563eb']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.8}>
            <ChevronLeft color="#ffffff" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <View style={styles.shieldBtn}>
            <ShieldAlert color="#ffffff" size={20} />
          </View>
        </View>

        <View style={styles.timerRow}>
          <View style={styles.timerBadge}>
            <Clock color="#ea580c" size={16} />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Progress Bar Header */}
      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>Question {currentQ + 1} of {questions.length}</Text>
          <Text style={styles.answeredCountText}>{Object.keys(answers).length} Answered</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((currentQ + 1) / questions.length) * 100}%` }]} />
        </View>
      </View>

      {/* Main Question Card */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{q.text}</Text>
          
          <View style={styles.optionsContainer}>
            {q.options.map((opt, idx) => {
              const isSelected = answers[currentQ] === opt;
              return (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.optionBtn, isSelected && styles.optionBtnSelected]}
                  onPress={() => handleSelect(opt)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Controls */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.navBtn, currentQ === 0 && styles.navBtnDisabled]} 
          disabled={currentQ === 0}
          onPress={() => setCurrentQ(prev => prev - 1)}
          activeOpacity={0.7}
        >
          <ChevronLeft color={currentQ === 0 ? "#cbd5e1" : "#475569"} size={20} />
          <Text style={[styles.navBtnText, currentQ === 0 && { color: '#cbd5e1' }]}>Previous</Text>
        </TouchableOpacity>

        {currentQ < questions.length - 1 ? (
          <TouchableOpacity style={styles.navBtnPrimary} onPress={() => setCurrentQ(prev => prev + 1)} activeOpacity={0.85}>
            <Text style={styles.navBtnPrimaryText}>Next Question</Text>
            <ChevronRight color="#ffffff" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <CheckCircle2 color="#ffffff" size={20} />
            <Text style={styles.submitBtnText}>Submit Test</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255, 255, 255, 0.15)', alignItems: 'center', justifyContent: 'center' },
  shieldBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255, 255, 255, 0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#ffffff', fontSize: 17, fontWeight: '900', flex: 1, textAlign: 'center', marginHorizontal: 10 },
  timerRow: { alignItems: 'center', marginTop: 14 },
  timerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffedd5', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, gap: 6 },
  timerText: { color: '#ea580c', fontWeight: '900', fontSize: 15 },
  
  progressSection: { paddingHorizontal: 20, marginTop: 16 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  answeredCountText: { fontSize: 12, fontWeight: '700', color: '#2563eb' },
  progressTrack: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 4 },
  
  content: { flex: 1, padding: 16 },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  questionText: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 22, lineHeight: 24 },
  optionsContainer: { gap: 12 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  optionBtnSelected: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#cbd5e1', marginRight: 14, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: '#2563eb' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563eb' },
  optionText: { fontSize: 14, color: '#475569', fontWeight: '600', flex: 1 },
  optionTextSelected: { color: '#0f172a', fontWeight: '900' },
  
  footer: { flexDirection: 'row', padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f1f5f9', justifyContent: 'space-between', alignItems: 'center' },
  navBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 4 },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { fontSize: 14, fontWeight: '800', color: '#475569' },
  navBtnPrimary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, gap: 6 },
  navBtnPrimaryText: { fontSize: 14, fontWeight: '800', color: '#ffffff' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16a34a', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, gap: 6 },
  submitBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
