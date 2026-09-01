import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Filter, Megaphone, BookOpen, Trophy, Bus, FileText, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NoticeBoardScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'General', 'Academics', 'Events', 'Transport'];

  const [noticesList, setNoticesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('http://10.0.2.2:5000/api/v1/communication/notices');
        const data = await res.json();
        
        if (data.data && data.data.notices) {
          const formatted = data.data.notices.map((notice: any) => {
            const isNew = new Date(notice.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000;
            // Map targetAudience to category loosely
            let cat = 'General';
            let icon = FileText;
            let color = '#2563eb';
            let bg = '#e0f2fe';
            
            if (notice.targetAudience === 'Parents' || notice.title.includes('PTM')) {
              cat = 'Academics'; icon = BookOpen; color = '#16a34a'; bg = '#dcfce7';
            } else if (notice.title.includes('Event') || notice.title.includes('Sports')) {
              cat = 'Events'; icon = Trophy; color = '#ea580c'; bg = '#ffedd5';
            } else if (notice.title.includes('Bus') || notice.title.includes('Transport')) {
              cat = 'Transport'; icon = Bus; color = '#2563eb'; bg = '#e0f2fe';
            }

            return {
              category: cat,
              date: new Date(notice.createdAt).toLocaleDateString(),
              isNew,
              title: notice.title,
              desc: notice.content || notice.description,
              icon,
              color,
              bg
            };
          });
          setNoticesList(formatted);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = activeCategory === 'All' 
    ? noticesList 
    : noticesList.filter(n => n.category === activeCategory);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notice Board</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Banner Card (Purple Gradient) */}
        <LinearGradient
          colors={['#5b21b6', '#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleBanner}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Stay Informed,{'\n'}Stay Connected</Text>
            <Text style={styles.bannerSub}>All important updates from your school</Text>
          </View>

          {/* 3D Yellow Megaphone Graphic Container */}
          <View style={styles.megaphoneGraphicBox}>
            <Megaphone size={40} color="#f59e0b" fill="#fef08a" strokeWidth={1.8} />
          </View>
        </LinearGradient>

        {/* Category Pills Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScrollView}>
          <View style={styles.pillsRow}>
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.pillBtn, isActive && styles.pillActive]}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Notices Cards List */}
        <View style={styles.noticesContainer}>
          {filteredNotices.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={styles.noticeCard}>
                {/* Top Category Row */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.categoryLeftGroup}>
                    <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                      <IconComp size={14} color={item.color} />
                    </View>
                    <Text style={[styles.categoryNameText, { color: item.color }]}>{item.category}</Text>
                  </View>

                  <View style={styles.categoryRightGroup}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    {item.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>New</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Notice Content */}
                <Text style={styles.noticeTitleText}>{item.title}</Text>
                <Text style={styles.noticeDescText}>{item.desc}</Text>
              </View>
            );
          })}
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
  filterBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Purple Banner
  purpleBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerLeft: { flex: 1, paddingRight: 10 },
  bannerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff', lineHeight: 24 },
  bannerSub: { fontSize: 11, color: '#ddd6fe', fontWeight: '500', marginTop: 6 },
  megaphoneGraphicBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category Pills
  pillsScrollView: { marginBottom: 16 },
  pillsRow: { flexDirection: 'row', gap: 8 },
  pillBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // Notice Cards List
  noticesContainer: { gap: 12 },
  noticeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryLeftGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconCircle: { width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  categoryNameText: { fontSize: 12, fontWeight: '800' },
  categoryRightGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateText: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
  newBadge: { backgroundColor: '#7c3aed', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  newBadgeText: { fontSize: 10, color: '#ffffff', fontWeight: '900' },
  noticeTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  noticeDescText: { fontSize: 12, color: '#64748b', lineHeight: 18, fontWeight: '500' },
});
