import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Radio, ShieldCheck, Cpu, Wifi } from 'lucide-react-native';

export default function DeviceStatusScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>OBD-II & GPS Telemetry Health</Text>
        <Text style={styles.subTitle}>Vehicle Hardware Diagnostics</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Radio size={20} color="#34d399" />
          <View style={styles.info}>
            <Text style={styles.label}>GPS Transmit Stream</Text>
            <Text style={styles.val}>CONNECTED (100ms Latency)</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Cpu size={20} color="#38bdf8" />
          <View style={styles.info}>
            <Text style={styles.label}>OBD-II Diagnostic Port</Text>
            <Text style={styles.val}>ACTIVE • Engine Temp 84°C</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Wifi size={20} color="#a855f7" />
          <View style={styles.info}>
            <Text style={styles.label}>Cellular IoT SIM Signal</Text>
            <Text style={styles.val}>4G VoLTE (4 / 5 Bars)</Text>
          </View>
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
  card: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  info: {
    flex: 1,
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
  },
  val: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
});
