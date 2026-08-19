import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { Calendar, Star, Flag, MapPin, Clock, ChevronLeft, ChevronRight, BookOpen, Award, Users, PartyPopper } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const HOLIDAY_COLORS: Record<string, string> = {
  National: '#ef4444',
  State: '#f97316',
  School: '#3b82f6',
  Religious: '#a855f7',
  Custom: '#6b7280',
};

interface CalendarDay {
  date: string;
  day: number;
  dayOfWeek: number;
  isSunday: boolean;
  isHoliday: boolean;
  holidays: { id: string; name: string; type: string }[];
  events: { id: string; title: string; type: string; status: string }[];
  exams: { id: string; name: string; class: string }[];
}

interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  targetAudience: string;
  status: string;
}

export default function TeacherCalendarScreen({ navigation }: any) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [loading, setLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const todayStr = new Date().toISOString().split('T')[0];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [calRes, evtRes] = await Promise.all([
        fetch(`http://localhost:5000/api/v1/calendar/monthly/${year}/${month}`),
        fetch('http://localhost:5000/api/v1/events/upcoming?days=30'),
      ]);
      const calJson = await calRes.json();
      const evtJson = await evtRes.json();
      if (calJson.success) setCalendarDays(calJson.data.days);
      if (evtJson.success) setUpcomingEvents(evtJson.data.events);
    } catch (err) {
      console.error('Calendar fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [year, month]);

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 2, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month, 1));

  const firstDayOfWeek = calendarDays.length > 0 ? calendarDays[0].dayOfWeek : 0;

  const EVENT_TYPE_ICONS: Record<string, string> = {
    Annual_Day: '🎉', Sports_Day: '🏆', PTM: '👥', Cultural: '🎨',
    Workshop: '💼', Competition: '🏅', Field_Trip: '📍',
    Examination: '📝', Orientation: '🎓', Farewell: '⭐', Custom: '📌',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Calendar size={26} color="#60a5fa" />
          <Text style={styles.headerTitle}>School Calendar</Text>
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={goToPrevMonth} style={styles.navBtn}>
            <ChevronLeft size={20} color="#60a5fa" />
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{MONTH_NAMES[month - 1]} {year}</Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.navBtn}>
            <ChevronRight size={20} color="#60a5fa" />
          </TouchableOpacity>
        </View>

        {/* Day Names */}
        <View style={styles.dayNamesRow}>
          {DAY_NAMES.map((d, i) => (
            <Text key={i} style={[styles.dayName, i === 0 && { color: '#ef4444' }]}>{d}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        {loading ? (
          <ActivityIndicator size="large" color="#60a5fa" style={{ marginVertical: 40 }} />
        ) : (
          <View style={styles.calendarGrid}>
            {/* Empty cells */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.dayCell} />
            ))}

            {calendarDays.map((day) => {
              const isToday = day.date === todayStr;
              const isSelected = selectedDay?.date === day.date;
              const hasContent = day.isHoliday || day.events.length > 0 || day.exams.length > 0;

              return (
                <TouchableOpacity
                  key={day.date}
                  onPress={() => setSelectedDay(isSelected ? null : day)}
                  style={[
                    styles.dayCell,
                    isToday && styles.todayCell,
                    isSelected && styles.selectedCell,
                    day.isHoliday && styles.holidayCell,
                  ]}
                >
                  <Text style={[
                    styles.dayNum,
                    day.isSunday && { color: '#ef4444' },
                    day.isHoliday && { color: '#f97316' },
                    isToday && { color: '#60a5fa', fontWeight: '800' as any },
                  ]}>
                    {day.day}
                  </Text>
                  {hasContent && (
                    <View style={styles.dotRow}>
                      {day.isHoliday && <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />}
                      {day.events.length > 0 && <View style={[styles.dot, { backgroundColor: '#10b981' }]} />}
                      {day.exams.length > 0 && <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Selected Day Detail */}
        {selectedDay && (
          <View style={styles.detailCard}>
            <Text style={styles.detailDate}>
              {new Date(selectedDay.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>

            {selectedDay.holidays.map((h, i) => (
              <View key={i} style={[styles.detailItem, { borderLeftColor: HOLIDAY_COLORS[h.type] || '#ef4444' }]}>
                <Flag size={14} color={HOLIDAY_COLORS[h.type] || '#ef4444'} />
                <Text style={styles.detailText}>{h.name}</Text>
                <View style={[styles.typeBadge, { backgroundColor: `${HOLIDAY_COLORS[h.type]}20` }]}>
                  <Text style={[styles.typeText, { color: HOLIDAY_COLORS[h.type] }]}>{h.type}</Text>
                </View>
              </View>
            ))}

            {selectedDay.events.map((e, i) => (
              <View key={i} style={[styles.detailItem, { borderLeftColor: '#10b981' }]}>
                <Star size={14} color="#10b981" />
                <Text style={styles.detailText}>{e.title}</Text>
              </View>
            ))}

            {selectedDay.exams.map((ex, i) => (
              <View key={i} style={[styles.detailItem, { borderLeftColor: '#f59e0b' }]}>
                <BookOpen size={14} color="#f59e0b" />
                <Text style={styles.detailText}>{ex.name} - {ex.class}</Text>
              </View>
            ))}

            {selectedDay.holidays.length === 0 && selectedDay.events.length === 0 && selectedDay.exams.length === 0 && (
              <Text style={styles.noContent}>No events on this day</Text>
            )}
          </View>
        )}

        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <PartyPopper size={18} color="#f59e0b" />
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>

        {upcomingEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No upcoming events</Text>
          </View>
        ) : (
          upcomingEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventIcon}>
                <Text style={{ fontSize: 20 }}>{EVENT_TYPE_ICONS[event.eventType] || '📌'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventMeta}>
                  <Calendar size={12} color="#64748b" />
                  <Text style={styles.eventMetaText}>
                    {new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </Text>
                  {event.startTime && (
                    <>
                      <Clock size={12} color="#64748b" />
                      <Text style={styles.eventMetaText}>{event.startTime}</Text>
                    </>
                  )}
                </View>
                {event.venue && (
                  <View style={styles.eventMeta}>
                    <MapPin size={12} color="#64748b" />
                    <Text style={styles.eventMetaText}>{event.venue}</Text>
                  </View>
                )}
              </View>
              <View style={[styles.eventTypeBadge, { backgroundColor: '#10b98120' }]}>
                <Text style={[styles.eventTypeText, { color: '#10b981' }]}>{event.eventType.replace(/_/g, ' ')}</Text>
              </View>
            </View>
          ))
        )}

        {/* Legend */}
        <View style={styles.legend}>
          {[
            { color: '#ef4444', label: 'Holiday' },
            { color: '#10b981', label: 'Event' },
            { color: '#f59e0b', label: 'Exam' },
          ].map((item, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#f8fafc' },
  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  navBtn: { padding: 8, borderRadius: 10, backgroundColor: 'rgba(59,130,246,0.12)' },
  monthLabel: { fontSize: 18, fontWeight: '700', color: '#f8fafc' },
  dayNamesRow: { flexDirection: 'row', marginBottom: 8 },
  dayName: { flex: 1, textAlign: 'center', color: '#94a3b8', fontSize: 13, fontWeight: '700' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  dayCell: {
    width: (width - 32) / 7, height: 50, alignItems: 'center', justifyContent: 'center',
    borderRadius: 8,
  },
  todayCell: { borderWidth: 2, borderColor: '#3b82f6' },
  selectedCell: { backgroundColor: 'rgba(59,130,246,0.15)' },
  holidayCell: { backgroundColor: 'rgba(239,68,68,0.06)' },
  dayNum: { fontSize: 14, fontWeight: '600', color: '#e2e8f0' },
  dotRow: { flexDirection: 'row', gap: 3, marginTop: 2 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  detailCard: {
    backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 14, padding: 16, marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.1)',
  },
  detailDate: { color: '#f8fafc', fontWeight: '700', fontSize: 15, marginBottom: 12 },
  detailItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10,
    backgroundColor: 'rgba(15,23,42,0.5)', marginBottom: 6, borderLeftWidth: 3,
  },
  detailText: { color: '#e2e8f0', fontSize: 13, fontWeight: '600', flex: 1 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeText: { fontSize: 11, fontWeight: '600' },
  noContent: { color: '#64748b', fontSize: 13, textAlign: 'center', paddingVertical: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14, marginTop: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#f8fafc' },
  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyText: { color: '#64748b', fontSize: 14 },
  eventCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 14, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.08)',
  },
  eventIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(245,158,11,0.12)', alignItems: 'center', justifyContent: 'center' },
  eventTitle: { color: '#f8fafc', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  eventMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  eventMetaText: { color: '#64748b', fontSize: 12 },
  eventTypeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  eventTypeText: { fontSize: 10, fontWeight: '700' },
  legend: { flexDirection: 'row', gap: 16, marginTop: 12, paddingVertical: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 3 },
  legendText: { color: '#94a3b8', fontSize: 12 },
});
