import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Video,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
  MoreHorizontal,
  PhoneOff,
  User,
  Users
} from 'lucide-react-native';

export default function LiveClassScreen({ navigation }: any) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const participants = [
    { id: '1', name: 'Aarav Sharma', micOn: true, videoOn: true },
    { id: '2', name: 'Diya Verma', micOn: true, videoOn: true },
    { id: '3', name: 'Rohan Singh', micOn: false, videoOn: false },
    { id: '4', name: 'Ananya Gupta', micOn: true, videoOn: true },
    { id: '5', name: 'Kunal Patel', micOn: false, videoOn: false }
  ];

  const handleEndClass = () => {
    Alert.alert('End Live Class', 'Are you sure you want to end this live lecture session?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'End Class', style: 'destructive', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Class</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveIndicatorText}>Live</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* VIDEO/HOST PREVIEW SCREEN AREA */}
        <View style={styles.videoPreviewCard}>
          <Text style={styles.hostTitle}>Class 8 - A</Text>
          <Text style={styles.hostSub}>Mathematics</Text>
          
          <View style={styles.avatarBadge}>
            <User size={32} color="#7c3aed" />
            <Text style={styles.avatarLabel}>You are the host</Text>
          </View>
        </View>

        {/* CALL STATS BAR */}
        <View style={styles.statsBar}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statVal}>00:32:15</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Students</Text>
            <Text style={styles.statVal}>36</Text>
          </View>
          <View style={[styles.statCol, { borderRightWidth: 0 }]}>
            <Text style={styles.statLabel}>Status</Text>
            <Text style={[styles.statVal, { color: '#16a34a' }]}>• Live</Text>
          </View>
        </View>

        {/* PARTICIPANTS */}
        <View style={styles.participantsHeader}>
          <Text style={styles.sectionTitle}>Participants (36)</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing complete participants roster...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.participantsList}>
          {participants.map((p) => (
            <View key={p.id} style={styles.participantRow}>
              <View style={styles.participantAvatar}>
                <User size={16} color="#7c3aed" />
              </View>
              <Text style={styles.participantName}>{p.name}</Text>
              
              <View style={styles.mediaIndicators}>
                {p.micOn ? (
                  <Mic size={18} color="#16a34a" style={{ marginRight: 10 }} />
                ) : (
                  <MicOff size={18} color="#dc2626" style={{ marginRight: 10 }} />
                )}

                {p.videoOn ? (
                  <Video size={18} color="#64748b" />
                ) : (
                  <VideoOff size={18} color="#dc2626" />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* MEETING CONTROLS BUTTONS */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
            onPress={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff size={20} color="#ffffff" /> : <Mic size={20} color="#475569" />}
            <Text style={[styles.controlText, isMuted && { color: '#ffffff' }]}>Mute</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, isVideoOff && styles.controlBtnActive]}
            onPress={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff size={20} color="#ffffff" /> : <Video size={20} color="#475569" />}
            <Text style={[styles.controlText, isVideoOff && { color: '#ffffff' }]}>Stop Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => Alert.alert('Share Screen', 'Initiating screen share...')}
          >
            <ScreenShare size={20} color="#475569" />
            <Text style={styles.controlText}>Share Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => Alert.alert('More Options', 'More options...')}
          >
            <MoreHorizontal size={20} color="#475569" />
            <Text style={styles.controlText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* END CLASS ACTION BUTTON */}
        <TouchableOpacity style={styles.endClassBtn} onPress={handleEndClass}>
          <PhoneOff size={18} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.endClassText}>End Class</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  liveIndicator: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
    marginRight: 6
  },
  liveIndicatorText: { fontSize: 11, fontWeight: '900', color: '#ef4444' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  videoPreviewCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    height: 180,
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 16
  },
  hostTitle: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  hostSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2, fontWeight: '600' },
  avatarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    position: 'absolute',
    top: 20,
    left: 20,
    gap: 8
  },
  avatarLabel: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9'
  },
  statLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '800' },
  statVal: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginTop: 4 },
  participantsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  participantsList: { gap: 10, marginBottom: 20 },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  participantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  participantName: { flex: 1, fontSize: 13, fontWeight: '800', color: '#334155' },
  mediaIndicators: { flexDirection: 'row', alignItems: 'center' },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  controlBtn: {
    width: '22%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center'
  },
  controlBtnActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  controlText: { fontSize: 9, fontWeight: '800', color: '#64748b', marginTop: 6 },
  endClassBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  endClassText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
