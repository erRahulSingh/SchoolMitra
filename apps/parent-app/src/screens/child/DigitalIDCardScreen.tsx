import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import { ChevronLeft, Share2, ShieldCheck } from 'lucide-react-native';
import { studentRohan3DUri } from '../../assets/parent3dAssets';

export default function DigitalIDCardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Digital ID Card</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Share2 size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Digital ID Card Main Box */}
        <View style={styles.idCardOuter}>
          {/* Top Curved Color Accent */}
          <View style={styles.topCurvedAccent} />

          {/* School Header */}
          <View style={styles.schoolHeaderRow}>
            <ShieldCheck size={26} color="#2563eb" />
            <View style={styles.schoolTitleCol}>
              <Text style={styles.appNameText}>SchoolMitra</Text>
              <Text style={styles.schoolNameText}>Green Valley Public School</Text>
            </View>
          </View>

          {/* Student Photo Avatar */}
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: studentRohan3DUri }}
              style={styles.photoImg}
              resizeMode="cover"
            />
          </View>

          {/* Student Name & Class */}
          <Text style={styles.studentNameText}>Rohan Sharma</Text>
          <Text style={styles.studentClassText}>Class 5th – A</Text>
          <Text style={styles.studentRollText}>Roll No. 12</Text>

          {/* Barcode Mock */}
          <View style={styles.barcodeBox}>
            <View style={styles.barcodeLinesRow}>
              {[2,4,1,3,2,1,4,2,3,1,2,4,1,3,2,4,1,2,3,4,1,3,2,1,4,2,1,3,2,4].map((w, idx) => (
                <View key={idx} style={[styles.barcodeLine, { width: w }]} />
              ))}
            </View>
            <Text style={styles.barcodeNumberText}>GVPS2024/0512</Text>
          </View>

          <View style={styles.dividerLine} />

          {/* Details Rows */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>D.O.B</Text>
              <Text style={styles.detailValText}>12 Aug 2014</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Blood Group</Text>
              <Text style={styles.detailValText}>B+</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Address</Text>
              <Text style={styles.detailValText}>123, Green Park, Lucknow, UP - 226001</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Phone</Text>
              <Text style={styles.detailValText}>+91 98765 43210</Text>
            </View>
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooterRow}>
            <Text style={styles.validityText}>
              This ID card is valid for{'\n'}Academic Year 2024-25
            </Text>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Geeta</Text>
              <Text style={styles.principalTitleText}>Principal</Text>
            </View>
          </View>

          {/* Bottom Curved Accent */}
          <View style={styles.bottomCurvedAccent} />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
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
  shareBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100, alignItems: 'center' },

  // ID Card Outer
  idCardOuter: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  topCurvedAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#2563eb',
  },
  bottomCurvedAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#16a34a',
  },

  schoolHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16, marginTop: 4 },
  schoolTitleCol: { alignItems: 'center' },
  appNameText: { fontSize: 14, fontWeight: '900', color: '#2563eb' },
  schoolNameText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },

  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#2563eb',
    marginBottom: 10,
  },
  photoImg: { width: '100%', height: '100%' },

  studentNameText: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  studentClassText: { fontSize: 13, color: '#2563eb', fontWeight: '800', marginTop: 2 },
  studentRollText: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },

  // Barcode
  barcodeBox: { alignItems: 'center', marginVertical: 14 },
  barcodeLinesRow: { flexDirection: 'row', height: 36, gap: 2, alignItems: 'center' },
  barcodeLine: { height: 32, backgroundColor: '#0f172a' },
  barcodeNumberText: { fontSize: 11, fontWeight: '800', color: '#475569', letterSpacing: 2, marginTop: 4 },

  dividerLine: { width: '100%', height: 1, backgroundColor: '#f1f5f9', marginBottom: 14 },

  // Details
  detailsContainer: { width: '100%', gap: 8, marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabelText: { width: 90, fontSize: 12, fontWeight: '700', color: '#64748b' },
  detailValText: { flex: 1, fontSize: 12, fontWeight: '800', color: '#0f172a', textAlign: 'right' },

  // Footer
  cardFooterRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  validityText: { fontSize: 10, color: '#94a3b8', fontWeight: '600', lineHeight: 14 },
  signatureBox: { alignItems: 'center' },
  signatureText: { fontSize: 16, fontStyle: 'italic', fontWeight: '900', color: '#0f172a' },
  principalTitleText: { fontSize: 10, color: '#64748b', fontWeight: '700' },
});
