import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { ChevronLeft, TrendingUp, BookOpen, Clock, Award, Activity } from 'lucide-react-native';

export default function AcademicPerformanceScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    studentName: "Aarav Sharma",
    attendance: "94%",
    overallResult: "88%",
    homework: "87%",
    academicProgress: {
      unitTest: "74%",
      halfYearly: "78%",
      annual: "85%"
    },
    trends: {
      monthlyProgress: [
        { month: "June", score: "72%" },
        { month: "July", score: "77%" },
        { month: "August", score: "82%" },
        { month: "Sep", score: "88%" }
      ],
      status: "Improving"
    },
    subjectPerformance: [
      { subjectName: "Science", percentage: "92", color: "#3b82f6" },
      { subjectName: "Maths", percentage: "85", color: "#10b981" },
      { subjectName: "English", percentage: "78", color: "#8b5cf6" },
      { subjectName: "Hindi", percentage: "88", color: "#f59e0b" },
      { subjectName: "Social", percentage: "65", color: "#ef4444" }
    ]
  });

  useEffect(() => {
    // Live DB sync from backend parent student performance endpoint
    const studentId = "647b0a7d903e1c001f3eabcd"; // Example ID
    fetch(`http://10.0.2.2:5000/api/v1/exams/performance/${studentId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.success && json.data) {
          const perf = json.data;
          
          const enhancedSubjects = (perf.subjectWise || []).map((s: any, idx: number) => {
             const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#14b8a6"];
             return {
               subjectName: s.subject,
               percentage: s.current.toString(),
               color: colors[idx % colors.length]
             };
          });

          // Map gpaTrend to monthlyProgress format if needed
          const monthlyProgress = (perf.gpaTrend || []).map((g: any) => ({
            month: g.exam,
            score: `${g.percentage}%`
          }));
          
          setData({
             studentName: "Aarav Sharma",
             attendance: "94%",
             overallResult: "88%",
             homework: "87%",
             academicProgress: {
               unitTest: monthlyProgress[0] ? monthlyProgress[0].score : "74%",
               halfYearly: monthlyProgress[1] ? monthlyProgress[1].score : "78%",
               annual: monthlyProgress[2] ? monthlyProgress[2].score : "85%"
             },
             trends: {
               monthlyProgress: monthlyProgress.length > 0 ? monthlyProgress : data.trends.monthlyProgress,
               status: "Improving"
             },
             subjectPerformance: enhancedSubjects.length > 0 ? enhancedSubjects : data.subjectPerformance
          });
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to fetch performance", e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Analytics</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Child Header Card */}
        <View style={styles.childHeaderCard}>
          <View>
            <Text style={styles.childLabel}>STUDENT DASHBOARD</Text>
            <Text style={styles.childName}>{data.studentName}</Text>
          </View>
          <View style={styles.gradeBadge}>
             <Text style={styles.gradeBadgeText}>Grade A</Text>
          </View>
        </View>

        {/* 1. Core Overview metrics */}
        <Text style={styles.sectionTitle}>Overview Metrics</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { borderLeftColor: '#4f46e5' }]}>
            <Clock size={20} color="#4f46e5" style={styles.boxIcon} />
            <Text style={styles.statLabel}>Attendance</Text>
            <Text style={[styles.statValue, { color: '#4f46e5' }]}>{data.attendance || "95%"}</Text>
          </View>

          <View style={[styles.statBox, { borderLeftColor: '#10b981' }]}>
            <Award size={20} color="#10b981" style={styles.boxIcon} />
            <Text style={styles.statLabel}>Overall Score</Text>
            <Text style={[styles.statValue, { color: '#10b981' }]}>{data.percentage || data.overallResult}</Text>
          </View>

          <View style={[styles.statBox, { borderLeftColor: '#8b5cf6' }]}>
            <BookOpen size={20} color="#8b5cf6" style={styles.boxIcon} />
            <Text style={styles.statLabel}>Homework</Text>
            <Text style={[styles.statValue, { color: '#8b5cf6' }]}>{data.homework || "90%"}</Text>
          </View>
        </View>

        {/* 2. Graphical Subject Mastery (NEW FEATURE) */}
        <Text style={styles.sectionTitle}>📊 Subject Mastery Analytics</Text>
        <View style={styles.masteryCard}>
          <Text style={styles.cardDesc}>Visual breakdown of subject-wise performance percentages.</Text>
          
          <View style={styles.barChartContainer}>
            {data.subjectPerformance?.map((sub: any, idx: number) => (
              <View key={idx} style={styles.barRow}>
                <View style={styles.barLabelCol}>
                  <Text style={styles.barLabel}>{sub.subjectName}</Text>
                  <Text style={styles.barScore}>{sub.percentage}%</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${sub.percentage}%`, backgroundColor: sub.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 3. Academic Progress Section */}
        <Text style={styles.sectionTitle}>📈 Term Progress</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <View>
              <Text style={styles.progressLabel}>Unit Test</Text>
              <Text style={styles.progressPercent}>{data.academicProgress?.unitTest}</Text>
            </View>
            <View style={styles.trackBar}>
              <View style={[styles.progressBar, { width: data.academicProgress?.unitTest, backgroundColor: '#3b82f6' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View>
              <Text style={styles.progressLabel}>Half Yearly</Text>
              <Text style={styles.progressPercent}>{data.academicProgress?.halfYearly}</Text>
            </View>
            <View style={styles.trackBar}>
              <View style={[styles.progressBar, { width: data.academicProgress?.halfYearly, backgroundColor: '#8b5cf6' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View>
              <Text style={styles.progressLabel}>Annual Examination</Text>
              <Text style={styles.progressPercent}>{data.academicProgress?.annual}</Text>
            </View>
            <View style={styles.trackBar}>
              <View style={[styles.progressBar, { width: data.academicProgress?.annual, backgroundColor: '#10b981' }]} />
            </View>
          </View>
        </View>

        {/* 4. Performance Trends */}
        <Text style={styles.sectionTitle}>Performance Trends</Text>
        <View style={styles.trendsCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
               <Activity size={18} color="#0f172a" />
               <Text style={styles.trendsSubTitle}>Monthly Score Index</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: data.trends?.status === 'Improving' ? '#e6f4ea' : '#fce8e6' }]}>
              <TrendingUp size={14} color={data.trends?.status === 'Improving' ? '#137333' : '#c5221f'} />
              <Text style={[styles.statusText, { color: data.trends?.status === 'Improving' ? '#137333' : '#c5221f' }]}>
                {data.trends?.status}
              </Text>
            </View>
          </View>

          <View style={styles.lineGraphPlaceholder}>
             {/* Simple Line Graph Simulation via Flex Layout */}
             <View style={styles.lineGraphGrid}>
                {[100, 75, 50, 25, 0].map(val => (
                  <View key={val} style={styles.gridLine}>
                     <Text style={styles.gridLabel}>{val}</Text>
                     <View style={styles.gridDashed} />
                  </View>
                ))}
                
                <View style={styles.plotArea}>
                   {data.trends?.monthlyProgress?.map((m: any, idx: number) => {
                      const score = parseInt(m.score);
                      const bottomPos = `${score}%`;
                      return (
                        <View key={idx} style={styles.plotPointContainer}>
                           <View style={[styles.plotPoint, { bottom: bottomPos }]} />
                           {/* Simulated Line connecting to previous (CSS borders are tricky, using vertical bar instead) */}
                           <View style={[styles.plotBar, { height: bottomPos }]} />
                           <Text style={styles.plotXLabel}>{m.month}</Text>
                        </View>
                      )
                   })}
                </View>
             </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  childHeaderCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  childLabel: { fontSize: 10, fontWeight: '800', color: '#94a3b8', letterSpacing: 1 },
  childName: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 4 },
  gradeBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1, borderColor: '#bbf7d0' },
  gradeBadgeText: { color: '#16a34a', fontWeight: '800', fontSize: 12 },

  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 4,
    borderRadius: 16,
    padding: 12,
  },
  boxIcon: { marginBottom: 6 },
  statLabel: { fontSize: 10, fontWeight: '800', color: '#64748b' },
  statValue: { fontSize: 18, fontWeight: '900', marginTop: 2 },

  masteryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  cardDesc: { fontSize: 12, color: '#64748b', marginBottom: 20, fontWeight: '500' },
  barChartContainer: { gap: 16 },
  barRow: {},
  barLabelCol: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  barScore: { fontSize: 13, fontWeight: '900', color: '#334155' },
  barTrack: { height: 10, backgroundColor: '#f1f5f9', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 },

  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 20
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  progressLabel: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  progressPercent: { fontSize: 12, fontWeight: '700', color: '#64748b', marginTop: 2 },
  trackBar: {
    width: '60%',
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 99,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 99
  },

  trendsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16
  },
  trendsSubTitle: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 99
  },
  statusText: { fontSize: 11, fontWeight: '800' },
  
  lineGraphPlaceholder: {
    height: 200,
    marginTop: 10,
    position: 'relative'
  },
  lineGraphGrid: { flex: 1, justifyContent: 'space-between', paddingBottom: 20 },
  gridLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gridLabel: { width: 25, fontSize: 10, color: '#94a3b8', textAlign: 'right', fontWeight: '600' },
  gridDashed: { flex: 1, height: 1, backgroundColor: '#e2e8f0', borderStyle: 'dashed' },
  
  plotArea: { position: 'absolute', top: 0, left: 33, right: 0, bottom: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
  plotPointContainer: { height: '100%', alignItems: 'center', justifyContent: 'flex-end', width: 40 },
  plotBar: { width: 8, backgroundColor: '#e0e7ff', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  plotPoint: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#4f46e5', borderWidth: 2, borderColor: '#ffffff', zIndex: 10 },
  plotXLabel: { position: 'absolute', bottom: -20, fontSize: 10, color: '#64748b', fontWeight: '700' }
});
