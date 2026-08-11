import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, Clock, Bus, MapPin } from 'lucide-react-native';

export default function DutyScheduleScreen() {
  const shifts = [
    { day: 'Monday - Friday', shift: 'Morning Shift', time: '06:30 AM - 09:00 AM', route: 'Route #4 (Sector 14 to School)' },
    { day: 'Monday - Friday', shift: 'Afternoon Shift', time: '02:00 PM - 04:30 PM', route: 'Route #4 (School to Sector 14)' },
    { day: 'Saturday', shift: 'Half Duty / Maintenance', time: '08:00 AM - 12:00 PM', route: 'Vehicle Servicing & Cleaning' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Weekly Shift Schedule</Text>
        <Text style={styles.subTitle}>Assigned duty roster for Bus UP-32-SM-9942</Text>
      </View>

      <View style={styles.list}>
        {shifts.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Calendar size={18} color="#38bdf8" />
              <Text style={styles.dayText}>{item.day}</Text>
            </View>

            <Text style={styles.shiftName}>{item.shift}</Text>

            <View style={styles.row}>
              <Clock size={16} color="#94a3b8" />
              <Text style={styles.infoText}>{item.time}</Text>
            </View>

            <View style={styles.row}>
              <MapPin size={16} color="#94a3b8" />
              <Text style={styles.infoText}>{item.route}</Text>
            </View>
          </View>
        ))}
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
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  shiftName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
});
