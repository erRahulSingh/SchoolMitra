import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Dimensions, Image as RNImage } from 'react-native';
import { ChevronLeft, LayoutGrid, Image as ImageIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32 - 12) / 2;

export default function GalleryScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Events', 'Activities', 'Celebrations', 'Trips'];

  const [albumsList, setAlbumsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch('http://10.0.2.2:5000/api/v1/gallery/albums');
        const data = await res.json();
        
        if (data.data && data.data.albums) {
          const formatted = data.data.albums.map((album: any) => {
            let cat = 'Events';
            if (album.title.includes('Trip')) cat = 'Trips';
            else if (album.title.includes('Day') || album.title.includes('Celebration')) cat = 'Celebrations';
            else if (album.title.includes('Exhibition')) cat = 'Activities';

            return {
              id: album._id,
              title: album.title,
              count: `${album.mediaCount || 0} Photos`,
              category: cat,
              image: album.coverPhoto || 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=500&auto=format&fit=crop&q=80',
              gradient: ['#3b82f6', '#1d4ed8'],
            };
          });
          setAlbumsList(formatted);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const filteredAlbums = activeCategory === 'All'
    ? albumsList
    : albumsList.filter(a => a.category === activeCategory);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gallery</Text>
        <TouchableOpacity style={styles.gridBtn}>
          <LayoutGrid size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

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

        {/* 2-Column Photo Album Grid */}
        <View style={styles.albumGrid}>
          {filteredAlbums.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.albumCard}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              {/* Photo Thumbnail Cover */}
              <View style={styles.photoBox}>
                <RNImage
                  source={{ uri: item.image }}
                  style={styles.albumImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(15, 23, 42, 0.4)']}
                  style={styles.imageOverlay}
                />
              </View>

              {/* Album Info */}
              <View style={styles.albumInfoBox}>
                <Text style={styles.albumTitleText} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.albumCountText}>{item.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  gridBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

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

  // 2-Column Album Grid
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  albumCard: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  photoBox: {
    height: 125,
    width: '100%',
    position: 'relative',
    backgroundColor: '#e2e8f0',
  },
  albumImage: { width: '100%', height: '100%' },
  imageOverlay: { ...StyleSheet.absoluteFillObject },
  albumInfoBox: { padding: 12 },
  albumTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a', lineHeight: 17 },
  albumCountText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 4 },
});
