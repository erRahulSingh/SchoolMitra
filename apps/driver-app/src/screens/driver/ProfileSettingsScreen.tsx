import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Globe, Moon, Sun, Check, ChevronRight, Bell, BellOff } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, LanguageCode } from '../../context/LanguageContext';

interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  available: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', available: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', available: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', available: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', available: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', available: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', available: true },
];

export default function ProfileSettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const selectLanguage = async (lang: Language) => {
    await setLanguage(lang.code);
    Alert.alert(
      t.languageUpdated || 'Language Updated ✅',
      `App language changed to ${lang.name} (${lang.nativeName})`
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Language Section */}
      <View style={styles.sectionHeader}>
        <Globe size={20} color={colors.accent} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.selectAppLanguage || 'App Language'}</Text>
      </View>
      <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
        {t.selectLanguage || 'Select your preferred language for the app interface'}
      </Text>

      <View style={styles.langGrid}>
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langCard,
                { 
                  backgroundColor: isSelected 
                    ? (isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)') 
                    : colors.card,
                  borderColor: isSelected ? colors.accent : colors.border,
                  borderWidth: isSelected ? 1.5 : 1,
                },
                !lang.available && { opacity: 0.55 },
              ]}
              onPress={() => selectLanguage(lang)}
              activeOpacity={0.7}
            >
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <View style={styles.langTextContainer}>
                <Text style={[styles.langName, { color: colors.text }]}>{lang.name}</Text>
                <Text style={[styles.langNative, { color: colors.textSecondary }]}>{lang.nativeName}</Text>
              </View>
              {isSelected ? (
                <View style={[styles.checkCircle, { backgroundColor: colors.accent }]}>
                  <Check size={12} color="#ffffff" strokeWidth={3} />
                </View>
              ) : !lang.available ? (
                <View style={[styles.comingSoonBadge, { backgroundColor: colors.warningSoft }]}>
                  <Text style={[styles.comingSoonText, { color: colors.warning }]}>Soon</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Theme Section */}
      <View style={[styles.divider, { borderColor: colors.border }]} />
      
      <View style={styles.sectionHeader}>
        {isDark ? <Moon size={20} color={colors.accent} /> : <Sun size={20} color={colors.warning} />}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
      </View>
      <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
        Choose your preferred theme mode
      </Text>

      <View style={styles.themeOptions}>
        {/* Dark Mode Card */}
        <TouchableOpacity
          style={[
            styles.themeCard,
            {
              backgroundColor: isDark 
                ? 'rgba(56, 189, 248, 0.12)' 
                : colors.card,
              borderColor: isDark ? colors.accent : colors.border,
              borderWidth: isDark ? 1.5 : 1,
            },
          ]}
          onPress={() => { if (!isDark) toggleTheme(); }}
          activeOpacity={0.7}
        >
          <View style={styles.themePreview}>
            <View style={[styles.previewBox, { backgroundColor: '#090d16' }]}>
              <View style={[styles.previewBar, { backgroundColor: '#1e293b' }]} />
              <View style={[styles.previewContent, { backgroundColor: '#131b2e' }]} />
              <View style={[styles.previewContent, { backgroundColor: '#131b2e', width: '60%' }]} />
            </View>
          </View>
          <View style={styles.themeInfo}>
            <Moon size={16} color={isDark ? colors.accent : colors.textMuted} />
            <Text style={[styles.themeName, { color: colors.text }]}>Dark</Text>
          </View>
          {isDark && (
            <View style={[styles.checkCircleSmall, { backgroundColor: colors.accent }]}>
              <Check size={10} color="#ffffff" strokeWidth={3} />
            </View>
          )}
        </TouchableOpacity>

        {/* Light Mode Card */}
        <TouchableOpacity
          style={[
            styles.themeCard,
            {
              backgroundColor: !isDark 
                ? 'rgba(2, 132, 199, 0.1)' 
                : colors.card,
              borderColor: !isDark ? colors.accent : colors.border,
              borderWidth: !isDark ? 1.5 : 1,
            },
          ]}
          onPress={() => { if (isDark) toggleTheme(); }}
          activeOpacity={0.7}
        >
          <View style={styles.themePreview}>
            <View style={[styles.previewBox, { backgroundColor: '#f1f5f9' }]}>
              <View style={[styles.previewBar, { backgroundColor: '#e2e8f0' }]} />
              <View style={[styles.previewContent, { backgroundColor: '#ffffff' }]} />
              <View style={[styles.previewContent, { backgroundColor: '#ffffff', width: '60%' }]} />
            </View>
          </View>
          <View style={styles.themeInfo}>
            <Sun size={16} color={!isDark ? colors.accent : colors.textMuted} />
            <Text style={[styles.themeName, { color: colors.text }]}>Light</Text>
          </View>
          {!isDark && (
            <View style={[styles.checkCircleSmall, { backgroundColor: colors.accent }]}>
              <Check size={10} color="#ffffff" strokeWidth={3} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View style={[styles.divider, { borderColor: colors.border }]} />
      
      <View style={styles.sectionHeader}>
        <Bell size={20} color={colors.warning} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
      </View>

      <View style={[styles.notifCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.notifRow, { borderBottomColor: colors.border }]}>
          <View style={styles.notifLeft}>
            <Bell size={16} color={colors.accent} />
            <View>
              <Text style={[styles.notifLabel, { color: colors.text }]}>Push Notifications</Text>
              <Text style={[styles.notifSub, { color: colors.textMuted }]}>Trip alerts, SOS responses</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#cbd5e1', true: '#0284c7' }}
            thumbColor={notificationsEnabled ? '#38bdf8' : '#ffffff'}
          />
        </View>
        <View style={styles.notifRow}>
          <View style={styles.notifLeft}>
            <BellOff size={16} color={colors.textMuted} />
            <View>
              <Text style={[styles.notifLabel, { color: colors.text }]}>Sound & Vibration</Text>
              <Text style={[styles.notifSub, { color: colors.textMuted }]}>Audio alerts for pickups</Text>
            </View>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#cbd5e1', true: '#0284c7' }}
            thumbColor={soundEnabled ? '#38bdf8' : '#ffffff'}
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSub: {
    fontSize: 13,
    marginBottom: 14,
    paddingLeft: 28,
  },
  divider: {
    borderTopWidth: 1,
    marginVertical: 20,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    flexGrow: 1,
    padding: 12,
    borderRadius: 12,
    gap: 8,
    minWidth: 150,
  },
  langFlag: {
    fontSize: 24,
  },
  langTextContainer: {
    flex: 1,
  },
  langName: {
    fontSize: 13,
    fontWeight: '600',
  },
  langNative: {
    fontSize: 12,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  themePreview: {
    width: '100%',
    marginBottom: 10,
  },
  previewBox: {
    height: 70,
    borderRadius: 8,
    padding: 8,
    gap: 4,
  },
  previewBar: {
    height: 8,
    borderRadius: 4,
    width: '80%',
  },
  previewContent: {
    height: 14,
    borderRadius: 4,
    width: '100%',
    marginTop: 4,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkCircleSmall: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 0.5,
  },
  notifLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  notifLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  notifSub: {
    fontSize: 11,
    marginTop: 1,
  },
});
