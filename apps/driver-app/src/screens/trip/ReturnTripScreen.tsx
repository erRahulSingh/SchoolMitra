import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Bus, Navigation, Clock, CheckCircle2 } from 'lucide-react-native';

export default function ReturnTripScreen({ navigation }: any) {
  const [started, setStarted] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Afternoon Return Trip Roster</Text>
        <Text style={styles.subTitle}>School Gate Departure • 02:30 PM</Text>
      </View>

      <TouchableOpacity 
        style={[styles.startBtn, started && styles.startedBtn]}
        onPress={() => {
          setStarted(!started);
          Alert.alert(started ? 'Trip Ended' : 'Return Trip Started', started ? 'Day duty completed.' : 'GPS tracking home drop route.');
        }}
      >
        <Bus size={22} color="#ffffff" />
        <Text style={styles.startBtnText}>
          {started ? 'FINISH & END AFTERNOON RETURN TRIP' : 'START AFTERNOON RETURN DROP TRIP'}
        </Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Return Drop Sequence</Text>
        <Text style={styles.cardSub}>Stops are executed in reverse order for evening drops.</Text>

        <View style={styles.stopItem}>
          <Clock size={16} color="#38bdf8" />
          <Text style={styles.stopText}>02:30 PM • School Main Gate Departure</Text>
        </View>
        <View style={styles.stopItem}>
          <Clock size={16} color="#38bdf8" />
          <Text style={styles.stopText}>02:45 PM • Mayur Vihar Phase 3 Drop</Text>
        </View>
        <View style={styles.stopItem}>
          <Clock size={16} color="#38bdf8" />
          <Text style={styles.stopText}>03:00 PM • Green Park Gate 2 Drop</Text>
        </View>
        <View style={styles.stopItem}>
          <Clock size={16} color="#38bdf8" />
          <Text style={styles.stopText}>03:15 PM • Sector 14 Crossing Final Drop</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subTitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  startBtn: {
    backgroundColor: '#0284c7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  startedBtn: {
    backgroundColor: '#059669',
  },
  startBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 12,
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardSub: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 6,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#090d16',
    padding: 12,
    borderRadius: 8,
  },
  stopText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
});
