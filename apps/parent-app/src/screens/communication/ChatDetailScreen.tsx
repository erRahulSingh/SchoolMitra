import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { ChevronLeft, Send, Phone, MoreVertical, Paperclip } from 'lucide-react-native';

export default function ChatDetailScreen({ navigation, route }: any) {
  const roomId = route?.params?.roomId || 'room_1';
  const chatName = route?.params?.chatName || 'Teacher Chat';

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:5000/api/v1/chat/messages/${roomId}`);
      const json = await res.json();
      if (json.success) {
        setMessages(json.data.messages || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setSending(true);
    
    // Optimistic UI Update
    const tempMsg = {
      id: Date.now().toString(),
      text: inputText,
      isSelf: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, tempMsg]);
    setInputText('');

    try {
      const res = await fetch(`http://10.0.2.2:5000/api/v1/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          text: tempMsg.text,
          senderId: 'parent_user_id' // Mock sender ID
        })
      });
      const json = await res.json();
      if (json.success) {
        // Trigger a fake reply popup after 3 seconds to simulate "teacher replying"
        setTimeout(() => {
          const fakeReply = {
            id: (Date.now() + 1).toString(),
            text: "Thank you for the message. I will check and get back to you.",
            isSelf: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, fakeReply]);
          setPopupMsg(fakeReply);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000); // hide popup after 3s
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{chatName}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <View style={styles.headerRightRow}>
          <TouchableOpacity style={styles.iconActionBtn}><Phone size={18} color="#0f172a" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconActionBtn}><MoreVertical size={20} color="#0f172a" /></TouchableOpacity>
        </View>
      </View>

      {/* Popup Toast */}
      {showPopup && popupMsg && (
        <View style={styles.popupToast}>
          <Text style={styles.popupTitle}>New Message from {chatName}</Text>
          <Text style={styles.popupText} numberOfLines={2}>{popupMsg.text}</Text>
        </View>
      )}

      {/* Chat Space */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          messages.map((msg, idx) => (
            <View key={msg.id || idx} style={[styles.bubbleWrapper, msg.isSelf ? styles.bubbleRight : styles.bubbleLeft]}>
              <View style={[styles.bubble, msg.isSelf ? styles.bgSelf : styles.bgOther]}>
                <Text style={[styles.msgText, msg.isSelf ? { color: '#ffffff' } : { color: '#0f172a' }]}>{msg.text}</Text>
                <Text style={[styles.timeText, msg.isSelf ? { color: '#bfdbfe' } : { color: '#94a3b8' }]}>{msg.timestamp}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.attachBtn}>
          <Paperclip size={20} color="#64748b" />
        </TouchableOpacity>
        <TextInput 
          style={styles.inputField} 
          placeholder="Type a message..." 
          placeholderTextColor="#94a3b8"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={[styles.sendBtn, !inputText.trim() && { opacity: 0.5 }]} onPress={handleSend} disabled={!inputText.trim() || sending}>
          <Send size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0',
    zIndex: 10
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerInfo: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  headerStatus: { fontSize: 11, color: '#16a34a', fontWeight: '700' },
  headerRightRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconActionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  
  // Popup
  popupToast: {
    position: 'absolute', top: 100, left: 16, right: 16, backgroundColor: '#ffffff',
    padding: 16, borderRadius: 16, elevation: 6, shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10,
    borderWidth: 1, borderColor: '#3b82f6', zIndex: 100
  },
  popupTitle: { fontSize: 13, fontWeight: '800', color: '#2563eb', marginBottom: 4 },
  popupText: { fontSize: 14, color: '#0f172a', fontWeight: '500' },

  scrollContent: { padding: 16, paddingBottom: 20 },

  // Chat Bubbles
  bubbleWrapper: { marginBottom: 12, width: '100%' },
  bubbleLeft: { alignItems: 'flex-start' },
  bubbleRight: { alignItems: 'flex-end' },
  bubble: { maxWidth: '80%', padding: 14, borderRadius: 20, elevation: 1, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  bgSelf: { backgroundColor: '#2563eb', borderBottomRightRadius: 4 },
  bgOther: { backgroundColor: '#ffffff', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#e2e8f0' },
  msgText: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  timeText: { fontSize: 10, fontWeight: '700', marginTop: 6, alignSelf: 'flex-end' },

  // Input
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  attachBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  inputField: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 20, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, maxHeight: 100, fontSize: 14, color: '#0f172a' },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
});
