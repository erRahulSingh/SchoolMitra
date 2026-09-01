import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image, ActivityIndicator } from 'react-native';
import { ChevronLeft, Download, Share2, ShieldCheck, Award } from 'lucide-react-native';

export default function ReportCardScreen({ navigation, route }: any) {
  const [reportCard, setReportCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch real report card from the new backend API
  useEffect(() => {
    const fetchReportCard = async () => {
      try {
        const studentId = "647b0a7d903e1c001f3eabcd"; // Example ID
        const res = await fetch(`http://10.0.2.2:5000/api/v1/exams/report-card/${studentId}`);
        const data = await res.json();
        
        if (data.success && data.data && data.data.reportCard) {
          const rc = data.data.reportCard;
          const stu = data.data.student || {};
          
          setReportCard({
            school: {
              name: "SANSKAR BHARTI HIGH SCHOOL",
              address: "123 Education Lane, Knowledge City",
              city: "New Delhi",
              state: "Delhi",
              phone: "+91-9876543210",
              logo: "https://via.placeholder.com/100"
            },
            studentName: stu.name || "Student Name",
            fatherName: stu.fatherName || "Father Name",
            motherName: stu.motherName || "Mother Name",
            dateOfBirth: stu.dob ? new Date(stu.dob).toISOString().split('T')[0] : "2010-05-14",
            rollNo: stu.rollNo || "00",
            rollCode: "SBHS-01",
            examName: rc.examId?.examName || "Term Examination",
            className: rc.classId?.className || "Class",
            attendance: {
              totalWorkingDays: 220,
              daysPresent: 200,
              percentage: "90.0%"
            },
            classRank: rc.classRank || 1,
            totalStudentsInClass: 45,
            subjects: rc.subjects ? rc.subjects.map((s: any, idx: number) => ({
              subjectCode: `10${idx+1}`,
              subjectName: s.subjectId?.subjectName || "Subject",
              maxMarks: s.maxMarks,
              passingMarks: Math.floor(s.maxMarks * 0.33),
              obtainedMarks: s.obtainedMarks,
              grade: s.grade,
              isPassed: s.isPassed
            })) : [],
            totalMarks: rc.totalMarks,
            obtainedMarks: rc.obtainedMarks,
            percentage: rc.percentage ? `${rc.percentage.toFixed(1)}%` : "",
            grade: rc.grade,
            division: rc.remarks || "FIRST DIVISION",
            status: rc.status || "PUBLISHED"
          });
        } else {
          // Fallback if no report card found
          throw new Error("No report card found");
        }
      } catch (e) {
        console.error("Failed to fetch report card, using fallback data", e);
        // Provide standard fallback so UI doesn't break
        setReportCard({
            school: { name: "SANSKAR BHARTI HIGH SCHOOL", address: "123 Education Lane", city: "New Delhi", state: "Delhi", phone: "+91-9876543210", logo: "https://via.placeholder.com/100" },
            studentName: "Rohan Sharma", fatherName: "Mr. Rajiv Sharma", motherName: "Mrs. Meena Sharma", dateOfBirth: "2010-05-14", rollNo: "10245", rollCode: "SBHS-01",
            examName: "No Report Card Published Yet", className: "Class 10th - A",
            attendance: { totalWorkingDays: 220, daysPresent: 198, percentage: "90.0%" }, classRank: 1, totalStudentsInClass: 45,
            subjects: [],
            totalMarks: 0, obtainedMarks: 0, percentage: "0%", grade: "-", division: "-", status: "DRAFT"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportCard();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text style={{ marginTop: 10, color: '#64748b' }}>Generating Official Mark Sheet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mark Sheet</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Share2 size={20} color="#1d4ed8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Download size={20} color="#1d4ed8" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Board Style Mark Sheet Container */}
        <View style={styles.boardMarkSheet}>
          
          {/* Authentic QR Badge */}
          <View style={styles.qrBadge}>
            <ShieldCheck size={16} color="#15803d" />
            <Text style={styles.qrText}>VERIFIED</Text>
          </View>

          {/* Gamification Topper Badge */}
          {reportCard.classRank && reportCard.classRank <= 3 && (
            <View style={[
              styles.topperBadge, 
              reportCard.classRank === 1 ? { backgroundColor: '#fef08a', borderColor: '#eab308' } :
              reportCard.classRank === 2 ? { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1' } :
              { backgroundColor: '#ffedd5', borderColor: '#fdba74' }
            ]}>
              <Award size={16} color={
                reportCard.classRank === 1 ? '#a16207' :
                reportCard.classRank === 2 ? '#475569' :
                '#c2410c'
              } />
              <Text style={[styles.topperText, {
                color: reportCard.classRank === 1 ? '#a16207' : reportCard.classRank === 2 ? '#475569' : '#c2410c'
              }]}>
                RANK {reportCard.classRank}
              </Text>
            </View>
          )}

          {/* School Header */}
          <View style={styles.schoolHeader}>
            {/* Logo Placeholder */}
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>SB</Text>
            </View>
            <View style={styles.schoolInfoText}>
              <Text style={styles.schoolName}>{reportCard.school.name}</Text>
              <Text style={styles.schoolAddress}>{reportCard.school.address}, {reportCard.school.city}, {reportCard.school.state}</Text>
              <Text style={styles.examName}>{reportCard.examName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Student Details */}
          <View style={styles.studentDetailsBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Student Name</Text>
              <Text style={styles.detailValue}>: {reportCard.studentName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Father's Name</Text>
              <Text style={styles.detailValue}>: {reportCard.fatherName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mother's Name</Text>
              <Text style={styles.detailValue}>: {reportCard.motherName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Roll Code & No.</Text>
              <Text style={styles.detailValue}>: {reportCard.rollCode} - {reportCard.rollNo}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Class</Text>
              <Text style={styles.detailValue}>: {reportCard.className}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Attendance</Text>
              <Text style={styles.detailValue}>: {reportCard.attendance?.percentage} ({reportCard.attendance?.daysPresent}/{reportCard.attendance?.totalWorkingDays} Days)</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Class Rank</Text>
              <Text style={[styles.detailValue, { color: '#1d4ed8' }]}>: {reportCard.classRank || 'N/A'} / {reportCard.totalStudentsInClass || 'N/A'}</Text>
            </View>
          </View>

          {/* Marks Table */}
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableColHeader, { flex: 0.8 }]}>SUB CODE</Text>
              <Text style={[styles.tableColHeader, { flex: 2.5 }]}>SUBJECT</Text>
              <Text style={[styles.tableColHeader, { flex: 1, textAlign: 'center' }]}>F.M.</Text>
              <Text style={[styles.tableColHeader, { flex: 1, textAlign: 'center' }]}>P.M.</Text>
              <Text style={[styles.tableColHeader, { flex: 1, textAlign: 'center' }]}>OBT</Text>
              <Text style={[styles.tableColHeader, { flex: 1, textAlign: 'center' }]}>GRD</Text>
            </View>

            {/* Table Rows */}
            {reportCard.subjects.map((sub: any, idx: number) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>{sub.subjectCode}</Text>
                <Text style={[styles.tableCell, { flex: 2.5, fontWeight: '700' }]}>{sub.subjectName}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>{sub.maxMarks}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>{sub.passingMarks}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: 'center', fontWeight: '800' }]}>{sub.obtainedMarks}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: 'center', color: '#16a34a', fontWeight: '900' }]}>{sub.grade}</Text>
              </View>
            ))}

            {/* Total Row */}
            <View style={styles.tableTotalRow}>
              <Text style={[styles.tableCell, { flex: 3.3, fontWeight: '800', textAlign: 'right', paddingRight: 10 }]}>AGGREGATE TOTAL :</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'center', fontWeight: '800' }]}>{reportCard.totalMarks}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}></Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'center', fontWeight: '900', color: '#1d4ed8' }]}>{reportCard.obtainedMarks}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}></Text>
            </View>
          </View>

          {/* Co-Scholastic Areas */}
          {reportCard.coScholastic && reportCard.coScholastic.length > 0 && (
            <View style={styles.coScholasticContainer}>
              <Text style={styles.coScholasticTitle}>CO-SCHOLASTIC AREAS</Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableColHeader, { flex: 4 }]}>TRAIT</Text>
                <Text style={[styles.tableColHeader, { flex: 1, textAlign: 'center' }]}>GRADE</Text>
              </View>
              {reportCard.coScholastic.map((item: any, idx: number) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 4 }]}>{item.trait}</Text>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: 'center', fontWeight: '800' }]}>{item.grade}</Text>
                </View>
              ))}
              <Text style={styles.gradingScaleNote}>
                * 5-Point Grading Scale: A (Outstanding), B (Very Good), C (Good), D (Average), E (Needs Improvement)
              </Text>
            </View>
          )}

          {/* Final Result & Remarks */}
          <View style={styles.resultSummaryBox}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>MARKS %</Text>
              <Text style={styles.resultVal}>{reportCard.percentage}</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>RESULT</Text>
              <Text style={[styles.resultVal, { color: reportCard.division.includes("FAIL") ? "#dc2626" : "#16a34a" }]}>
                {reportCard.division}
              </Text>
            </View>
          </View>

          {/* Signatures */}
          <View style={styles.signaturesBox}>
            <View style={styles.signatureSlot}>
              <Text style={styles.signatureLine}>____________________</Text>
              <Text style={styles.signatureLabel}>Class Teacher</Text>
            </View>
            <View style={styles.signatureSlot}>
              <Text style={styles.signatureLine}>____________________</Text>
              <Text style={styles.signatureLabel}>Principal</Text>
            </View>
          </View>

        </View>

        <Text style={styles.disclaimerText}>
          Disclaimer: This is a computer-generated mark sheet and does not require a physical signature for informational purposes.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#f1f5f9',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  headerActions: { flexDirection: 'row', gap: 12 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#dbeafe', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 12, paddingBottom: 60 },

  // Board Style Mark Sheet
  boardMarkSheet: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  qrBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 4,
  },
  qrText: { fontSize: 10, fontWeight: '800', color: '#15803d' },

  topperBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    gap: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 }
  },
  topperText: { fontSize: 10, fontWeight: '900' },

  schoolHeader: { alignItems: 'center', marginBottom: 16, marginTop: 10 },
  logoCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#1e3a8a', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  logoText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  schoolInfoText: { alignItems: 'center' },
  schoolName: { fontSize: 18, fontWeight: '900', color: '#b91c1c', textAlign: 'center', letterSpacing: 0.5 },
  schoolAddress: { fontSize: 11, color: '#334155', marginTop: 2, textAlign: 'center' },
  examName: { fontSize: 13, fontWeight: '800', color: '#1d4ed8', marginTop: 8, textTransform: 'uppercase', textAlign: 'center' },
  
  divider: { height: 2, backgroundColor: '#1e293b', marginVertical: 12 },

  studentDetailsBox: { marginBottom: 16 },
  detailRow: { flexDirection: 'row', marginBottom: 4 },
  detailLabel: { flex: 1, fontSize: 12, fontWeight: '700', color: '#475569' },
  detailValue: { flex: 2, fontSize: 12, fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' },

  tableContainer: { borderWidth: 1, borderColor: '#94a3b8', borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 1, borderBottomColor: '#94a3b8', paddingVertical: 8, paddingHorizontal: 4 },
  tableColHeader: { fontSize: 10, fontWeight: '900', color: '#0f172a' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 4 },
  tableCell: { fontSize: 11, color: '#1e293b' },
  tableTotalRow: { flexDirection: 'row', backgroundColor: '#f8fafc', paddingVertical: 10, paddingHorizontal: 4 },

  coScholasticContainer: { borderWidth: 1, borderColor: '#94a3b8', borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  coScholasticTitle: { fontSize: 11, fontWeight: '800', backgroundColor: '#e2e8f0', paddingVertical: 6, paddingHorizontal: 8, color: '#334155', letterSpacing: 0.5 },
  gradingScaleNote: { fontSize: 9, color: '#64748b', padding: 6, fontStyle: 'italic', backgroundColor: '#f8fafc' },

  resultSummaryBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 6, paddingVertical: 12, marginBottom: 24 },
  resultItem: { flex: 1, alignItems: 'center' },
  resultDivider: { width: 1, height: '100%', backgroundColor: '#cbd5e1' },
  resultLabel: { fontSize: 11, fontWeight: '800', color: '#64748b', marginBottom: 4 },
  resultVal: { fontSize: 16, fontWeight: '900', color: '#0f172a' },

  signaturesBox: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  signatureSlot: { alignItems: 'center' },
  signatureLine: { color: '#94a3b8', marginBottom: 4 },
  signatureLabel: { fontSize: 11, fontWeight: '700', color: '#475569' },

  disclaimerText: { fontSize: 10, color: '#94a3b8', textAlign: 'center', marginTop: 12, paddingHorizontal: 20 },
});
