import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Image, Modal } from 'react-native';
import { ChevronLeft, Send, Camera, Mic, MoreVertical, Sparkles, Volume2, Square, Edit3, HelpCircle, FileText } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import Markdown from 'react-native-markdown-display';
import * as Speech from 'expo-speech';
import SignatureScreen from 'react-native-signature-canvas';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const AiLogo = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="11" width="18" height="10" rx="2" />
    <Circle cx="12" cy="5" r="2" />
    <Path d="M12 7v4" />
    <Path d="M8 16v.01" />
    <Path d="M16 16v.01" />
  </Svg>
);

export default function AiDoubtSolverScreen({ navigation }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [doubtsRemaining, setDoubtsRemaining] = useState(5);
  
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: "Hi! I'm your AI teacher 🤖. You can ask me any math, science, or academic question.\n\nUse the **Draw** icon to sketch a math equation or physics diagram with your finger!",
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  const streamAiResponse = (fullText: string, messageId: string) => {
    const words = fullText.split(' ');
    let currentText = '';
    let wordIndex = 0;

    const streamInterval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, text: currentText } : msg
        ));
        
        wordIndex++;
        scrollViewRef.current?.scrollToEnd({ animated: false });
      } else {
        clearInterval(streamInterval);
        setLoading(false);
      }
    }, 50);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    if (doubtsRemaining <= 0) { alert("Daily Limit Reached."); return; }

    const userMessage = { id: Date.now().toString(), sender: 'user', text: inputText, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDoubtsRemaining(prev => prev - 1);
      
      const aiResponseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiResponseId, sender: 'ai', text: "", timestamp: new Date().toISOString(), subject: "General Academic" }]);

      streamAiResponse(`### Step-by-Step Solution\n\nHere is a detailed breakdown for **${userMessage.text}**:\n\n1. Analyze the core concept.\n2. Apply the mathematical formula.\n3. Solve for the variable.\n\n$$ E = mc^2 $$`, aiResponseId);
    } catch (err) { alert("Error sending doubt"); setLoading(false); }
  };

  const pickMedia = async () => {
    if (doubtsRemaining <= 0) { alert("Daily Limit Reached."); return; }
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, quality: 0.8 });

    if (!result.canceled) {
      const asset = result.assets[0];
      const isVideo = asset.type === 'video' || asset.uri.endsWith('.mp4') || asset.uri.endsWith('.mov');
      
      const userMessage = { 
        id: Date.now().toString(), 
        sender: 'user', 
        text: isVideo ? "🎥 [Video Attached]" : "📷 [Image Attached]", 
        mediaUri: asset.uri, 
        mediaType: isVideo ? 'video' : 'image', 
        timestamp: new Date().toISOString() 
      };
      setMessages(prev => [...prev, userMessage]);
      setLoading(true);

      setTimeout(() => {
        setDoubtsRemaining(prev => prev - 1);
        const aiResponseId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: aiResponseId, sender: 'ai', text: "", timestamp: new Date().toISOString(), subject: "Science" }]);
        
        if (isVideo) {
          streamAiResponse(`### Video Analysis 🎥\n\nI processed the frames of your video. The swinging pendulum demonstrates conservation of energy. \n\n\`\`\`json\n{"quiz":[{"question":"What energy is max at the highest point?","options":["Kinetic","Potential","Heat","Sound"],"answer":"Potential"}]}\n\`\`\``, aiResponseId);
        } else {
          streamAiResponse(`### Image Analysis\n\nBased on your photo, here is the solution:\n\n1. Isolate **x**.\n2. Divide both sides by 2.\n\nThe answer is **x = 42**.\n\n\`\`\`json\n{"quiz":[{"question":"What is 42 * 2?","options":["84","82","88","90"],"answer":"84"}]}\n\`\`\``, aiResponseId);
        }
      }, 1500);
    }
  };

  const handleSignature = (signature: string) => {
    setShowCanvas(false);
    if (doubtsRemaining <= 0) { alert("Daily Limit Reached."); return; }

    const userMessage = { id: Date.now().toString(), sender: 'user', text: "✍️ [Whiteboard Drawing Attached]", imageUri: signature, mediaType: 'image', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      setDoubtsRemaining(prev => prev - 1);
      const aiResponseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiResponseId, sender: 'ai', text: "", timestamp: new Date().toISOString(), subject: "Physics" }]);
      streamAiResponse(`### Whiteboard Analysis\n\nI processed your hand-drawn diagram. This represents a free-body diagram showing Normal Force and Gravity balancing each other. \n\n$$ F_N = mg $$`, aiResponseId);
    }, 1500);
  };

  const toggleRecording = async () => {
    if (doubtsRemaining <= 0) { alert("Daily Limit Reached."); return; }
    try {
      if (recording) {
        setLoading(true);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        const userMessage = { id: Date.now().toString(), sender: 'user', text: "🎤 [Voice Note Attached]", audioUri: uri, mediaType: 'audio', timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
          setDoubtsRemaining(prev => prev - 1);
          const aiResponseId = (Date.now() + 1).toString();
          setMessages(prev => [...prev, { id: aiResponseId, sender: 'ai', text: "", timestamp: new Date().toISOString(), subject: "Biology" }]);
          streamAiResponse(`### Voice Query Received 🎤\n\n**Photosynthesis** is the process by which green plants transform light energy into chemical energy.`, aiResponseId);
        }, 1500);
      } else {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status === 'granted') {
          await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
          const { recording: newRecording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
          setRecording(newRecording);
        }
      }
    } catch (err) { console.error('Failed to record audio', err); }
  };

  const toggleSpeech = (text: string) => {
    if (isSpeaking) {
      Speech.stop(); setIsSpeaking(false);
    } else {
      const cleanText = text.replace(/[#*_>]/g, '');
      Speech.speak(cleanText, { onDone: () => setIsSpeaking(false), onStopped: () => setIsSpeaking(false) });
      setIsSpeaking(true);
    }
  };

  const pickDocument = async () => {
    if (doubtsRemaining <= 0) { alert("Daily Limit Reached."); return; }
    
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const name = result.assets[0].name;

        const userMessage = { id: Date.now().toString(), sender: 'user', text: `📄 [PDF Attached: ${name}]`, mediaType: 'pdf', timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        setTimeout(() => {
          setDoubtsRemaining(prev => prev - 1);
          const aiResponseId = (Date.now() + 1).toString();
          setMessages(prev => [...prev, { id: aiResponseId, sender: 'ai', text: "", timestamp: new Date().toISOString(), subject: "Literature" }]);
          streamAiResponse(`### PDF Analysis\n\nI have read the uploaded PDF document. Based on page 3, here is the summary you requested...`, aiResponseId);
        }, 2000);
      }
    } catch (err) {
      console.log("Document picker error", err);
    }
  };

  const escalateToTeacher = () => {
    alert("Doubt Ticket Escalated! Your class teacher will respond shortly via the SchoolMitra app.");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      
      {/* Whiteboard Modal */}
      <Modal visible={showCanvas} animationType="slide">
        <View style={styles.canvasHeader}>
          <Text style={styles.canvasTitle}>Digital Whiteboard</Text>
          <TouchableOpacity onPress={() => setShowCanvas(false)}>
            <Text style={styles.canvasClose}>Close</Text>
          </TouchableOpacity>
        </View>
        <SignatureScreen
          onOK={handleSignature}
          onEmpty={() => alert("Please draw something before saving.")}
          descriptionText="Draw your doubt above (e.g. math equations)"
          clearText="Clear"
          confirmText="Send to AI"
          webStyle={`.m-signature-pad {box-shadow: none; border: none;}`}
        />
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>AI Doubt Solver</Text>
          <Text style={styles.headerSubtitle}>100% Powerful AI Teacher</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MoreVertical size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <View style={styles.limitBanner}>
        <Sparkles size={14} color="#ca8a04" />
        <Text style={styles.limitText}>{doubtsRemaining} / 5 Free Doubts Remaining</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
            {msg.sender === 'ai' && (
              <View style={styles.aiAvatar}><AiLogo /></View>
            )}
            
            <View style={msg.sender === 'ai' ? styles.aiTextContainer : styles.userTextContainer}>
              {msg.mediaUri && <Image source={{ uri: msg.mediaUri }} style={styles.uploadedImage} />}
              
              {msg.sender === 'ai' ? (
                <View>
                  {msg.subject && (
                    <Text style={styles.subjectBadge}>Tag: {msg.subject}</Text>
                  )}
                  {/* Clean out the JSON quiz from markdown view */}
                  <Markdown style={markdownStyles}>
                    {msg.text.replace(/```json\n([\s\S]*?)\n```/g, '*[Interactive Quiz Generated Below]*')}
                  </Markdown>

                  {/* Render the extracted JSON Quiz */}
                  {(() => {
                    const match = msg.text.match(/```json\n([\s\S]*?)\n```/);
                    if (match && match[1]) {
                      try {
                        const data = JSON.parse(match[1]);
                        if (data.quiz && data.quiz.length > 0) {
                          return (
                            <View style={styles.quizBox}>
                              <Text style={styles.quizHeader}>🧠 AI Mini-Quiz</Text>
                              {data.quiz.map((q: any, i: number) => (
                                <View key={i} style={styles.quizQuestionBox}>
                                  <Text style={styles.quizQuestion}>{i + 1}. {q.question}</Text>
                                  {q.options.map((opt: string, j: number) => (
                                    <TouchableOpacity key={j} style={styles.quizOptionBtn}>
                                      <Text style={styles.quizOptionText}>{opt}</Text>
                                    </TouchableOpacity>
                                  ))}
                                </View>
                              ))}
                            </View>
                          );
                        }
                      } catch(e) {}
                    }
                    return null;
                  })()}
                  
                  {/* Footer Actions */}
                  {msg.text.length > 10 && (
                    <View style={styles.aiActionRow}>
                      <TouchableOpacity style={styles.actionBtn} onPress={() => toggleSpeech(msg.text)}>
                        {isSpeaking ? <Square size={14} color="#4f46e5" /> : <Volume2 size={14} color="#64748b" />}
                        <Text style={styles.actionText}>{isSpeaking ? "Stop" : "Listen"}</Text>
                      </TouchableOpacity>

                      <View style={styles.actionDivider} />

                      <TouchableOpacity style={styles.actionBtn} onPress={escalateToTeacher}>
                        <HelpCircle size={14} color="#ef4444" />
                        <Text style={[styles.actionText, { color: '#ef4444' }]}>Ask Teacher</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <Text style={styles.userText}>{msg.text}</Text>
              )}
            </View>
          </View>
        ))}

        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
             <View style={styles.aiAvatar}><AiLogo /></View>
             <View style={styles.aiTextContainer}><ActivityIndicator size="small" color="#4f46e5" /></View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachBtn} onPress={() => setShowCanvas(true)}>
          <Edit3 size={22} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.attachBtn} onPress={pickMedia}>
          <Camera size={22} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.attachBtn} onPress={pickDocument}>
          <FileText size={22} color="#64748b" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.textInput}
          placeholder="Ask your doubt here..."
          placeholderTextColor="#94a3b8"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        {inputText.length > 0 ? (
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.micBtn, recording ? styles.recordingBtn : null]} onPress={toggleRecording}>
            <Mic size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const markdownStyles = {
  body: { fontSize: 14, color: '#1e293b', lineHeight: 22 },
  heading3: { fontSize: 16, fontWeight: '800', marginBottom: 8, color: '#0f172a' },
  strong: { fontWeight: '700' },
  list_item: { marginVertical: 2 },
  blockquote: { borderLeftWidth: 3, borderLeftColor: '#cbd5e1', paddingLeft: 8, fontStyle: 'italic', color: '#64748b', marginTop: 10 }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  iconBtn: { padding: 8 },
  headerTitleBox: { alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  headerSubtitle: { fontSize: 11, color: '#4f46e5', fontWeight: '600' },
  limitBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef9c3', paddingVertical: 6, gap: 6 },
  limitText: { fontSize: 12, fontWeight: '700', color: '#a16207' },
  chatArea: { flex: 1 },
  chatContent: { padding: 16, paddingBottom: 24, gap: 16 },
  messageBubble: { flexDirection: 'row', maxWidth: '85%' },
  userBubble: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
  aiBubble: { alignSelf: 'flex-start' },
  aiAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center', marginRight: 8, marginTop: 4 },
  aiTextContainer: { backgroundColor: '#ffffff', padding: 12, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: '#e2e8f0', minWidth: 60 },
  userTextContainer: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 16, borderTopRightRadius: 4 },
  userText: { fontSize: 14, color: '#ffffff', lineHeight: 22 },
  uploadedImage: { width: 200, height: 150, borderRadius: 8, marginBottom: 8 },
  subjectBadge: { fontSize: 10, color: '#6366f1', fontWeight: '800', marginBottom: 4, textTransform: 'uppercase' },
  
  aiActionRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionDivider: { width: 1, height: 16, backgroundColor: '#cbd5e1', marginHorizontal: 12 },
  actionText: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 8, paddingVertical: 10, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  attachBtn: { padding: 10, justifyContent: 'center', alignItems: 'center' },
  textInput: { flex: 1, minHeight: 44, maxHeight: 120, backgroundColor: '#f1f5f9', borderRadius: 22, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, fontSize: 14, color: '#0f172a' },
  sendBtn: { width: 44, height: 44, backgroundColor: '#4f46e5', borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  micBtn: { width: 44, height: 44, backgroundColor: '#0f172a', borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  recordingBtn: { backgroundColor: '#ef4444' },

  canvasHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 50, backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  canvasTitle: { fontSize: 16, fontWeight: '700' },
  canvasClose: { fontSize: 16, color: '#4f46e5', fontWeight: '600' },
  
  quizBox: { marginTop: 16, backgroundColor: '#f8fafc', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  quizHeader: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  quizQuestionBox: { marginBottom: 12 },
  quizQuestion: { fontSize: 13, fontWeight: '600', color: '#1e293b', marginBottom: 8 },
  quizOptionBtn: { backgroundColor: '#ffffff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 6 },
  quizOptionText: { fontSize: 13, color: '#475569' }
});
