import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  School,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Hash,
  Search,
  Building,
  Check,
  MapPin,
  RefreshCw,
} from 'lucide-react-native';
import ParentAppLogo from '../../components/ParentAppLogo';
import { useParentAuth } from '../../context/ParentAuthContext';
import { parentApi } from '../../lib/api';

export default function SignupScreen({ navigation }: any) {
  const { register } = useParentAuth();

  // Current Step: 1 = Parent Details, 2 = Child & School Details
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Parent Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState<'Father' | 'Mother' | 'Guardian'>('Father');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Dynamic Schools State
  const [schoolSearch, setSchoolSearch] = useState('');
  const [schoolsList, setSchoolsList] = useState<any[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);

  // Step 2: Student Discovery State
  const [studentQuery, setStudentQuery] = useState('');
  const [searchingStudent, setSearchingStudent] = useState(false);
  const [foundStudents, setFoundStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // Manual fallback fields
  const [childName, setChildName] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [childClass, setChildClass] = useState('Class 10 - A');
  const [isManualEntry, setIsManualEntry] = useState(false);

  // UI State
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch initial schools on Step 2 load
  useEffect(() => {
    if (step === 2 && schoolsList.length === 0) {
      loadSchools();
    }
  }, [step]);

  const loadSchools = async (query: string = '') => {
    try {
      setLoadingSchools(true);
      const res = await parentApi.getSchools(query);
      if (res.success && Array.isArray(res.data)) {
        setSchoolsList(res.data);
        if (!selectedSchool && res.data.length > 0) {
          setSelectedSchool(res.data[0]);
        }
      }
    } catch (err) {
      console.warn('[Signup] Error loading schools:', err);
    } finally {
      setLoadingSchools(false);
    }
  };

  const handleSchoolSearch = (text: string) => {
    setSchoolSearch(text);
    loadSchools(text);
  };

  const handleSelectSchool = (school: any) => {
    setSelectedSchool(school);
    setSelectedStudent(null);
    setFoundStudents([]);
  };

  // Live Student Search inside Selected School
  const handleFindStudent = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : studentQuery).trim();
    if (!q) {
      setFoundStudents([]);
      return;
    }
    if (!selectedSchool) {
      setErrorMsg('Please select a school first.');
      return;
    }

    try {
      setSearchingStudent(true);
      setErrorMsg('');
      const res = await parentApi.lookupStudents({
        schoolId: selectedSchool.id,
        schoolCode: selectedSchool.code,
        query: q,
      });

      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setFoundStudents(res.data);
      } else {
        setFoundStudents([]);
      }
    } catch (err) {
      console.warn('[Signup] Student lookup error:', err);
    } finally {
      setSearchingStudent(false);
    }
  };

  const handleSelectStudent = (st: any) => {
    setSelectedStudent(st);
    setChildName(st.name);
    setAdmissionNo(st.admissionNo || st.rollNo || '');
    setChildClass(st.class || 'Class 10 - A');
    setIsManualEntry(false);
    setErrorMsg('');
  };

  // Step 1 Validation
  const validateStep1 = () => {
    setErrorMsg('');
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return false;
    }
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    setErrorMsg('');
    if (!selectedSchool) {
      setErrorMsg('Please search and select your registered school.');
      return false;
    }
    if (!childName.trim()) {
      setErrorMsg("Please select or enter your child's full name.");
      return false;
    }
    if (!admissionNo.trim()) {
      setErrorMsg('Please enter student admission number or roll number.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;

    setErrorMsg('');
    setSubmitting(true);

    try {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const res = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        password,
        relation,
        schoolCode: selectedSchool?.code || 'sch-1000',
        childName: childName.trim(),
        studentAdmissionNo: admissionNo.trim(),
        childClass: childClass.trim() || 'Class 10 - A',
        studentId: selectedStudent?.id,
        rollNo: selectedStudent?.rollNo,
      });

      if (res.success) {
        Alert.alert(
          '🎉 Account Created Successfully!',
          `Welcome to SchoolMitra! Your child ${childName} is now connected with ${selectedSchool?.name || 'School'}.`,
          [
            {
              text: 'Go to Dashboard',
              onPress: () => navigation.replace('MainTabs'),
            },
          ]
        );
      } else {
        setErrorMsg(res.message || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Server error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Hero Gradient */}
      <LinearGradient
        colors={['#4f46e5', '#6366f1', '#a855f7']}
        style={styles.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ marginBottom: 8 }}>
          <ParentAppLogo size="small" />
        </View>
        <Text style={styles.appTitle}>SchoolMitra</Text>
        <Text style={styles.appSub}>Parent Portal Registration</Text>

        {/* Step Progression Pills */}
        <View style={styles.stepContainer}>
          <TouchableOpacity
            style={[styles.stepPill, step === 1 && styles.stepPillActive]}
            onPress={() => setStep(1)}
          >
            <Text style={[styles.stepPillText, step === 1 && styles.stepPillTextActive]}>
              1. Parent Profile
            </Text>
          </TouchableOpacity>
          <View style={styles.stepConnector} />
          <TouchableOpacity
            style={[styles.stepPill, step === 2 && styles.stepPillActive]}
            onPress={() => validateStep1() && setStep(2)}
          >
            <Text style={[styles.stepPillText, step === 2 && styles.stepPillTextActive]}>
              2. School & Child
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Form Body */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formWrap}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Title */}
          <Text style={styles.welcomeTitle}>
            {step === 1 ? 'Parent Information 👨‍👩‍👧' : 'Connect Your School & Child 🏫'}
          </Text>
          <Text style={styles.welcomeSub}>
            {step === 1
              ? 'Enter your contact details to stay connected with the school'
              : 'Select your school from registered schools and find your child'}
          </Text>

          {/* Error Banner */}
          {errorMsg ? (
            <View style={styles.errorBox}>
              <AlertCircle size={18} color="#ef4444" />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          {/* STEP 1: PARENT DETAILS */}
          {step === 1 && (
            <View style={styles.inputGroup}>
              {/* Full Name */}
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Full Name</Text>
              </View>
              <View style={styles.inputRow}>
                <User size={18} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Rajesh Sharma"
                  placeholderTextColor="#94a3b8"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              {/* Relationship Chips */}
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Relationship to Student</Text>
              </View>
              <View style={styles.chipRow}>
                {(['Father', 'Mother', 'Guardian'] as const).map((rel) => (
                  <TouchableOpacity
                    key={rel}
                    style={[styles.chip, relation === rel && styles.chipActive]}
                    onPress={() => setRelation(rel)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, relation === rel && styles.chipTextActive]}>
                      {rel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Mobile Phone */}
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Mobile Phone</Text>
              </View>
              <View style={styles.inputRow}>
                <Phone size={18} color="#94a3b8" />
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="9876543210"
                  placeholderTextColor="#94a3b8"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              {/* Email Address */}
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Email Address</Text>
              </View>
              <View style={styles.inputRow}>
                <Mail size={18} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="parent@example.com"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Create Password</Text>
              </View>
              <View style={styles.inputRow}>
                <Lock size={18} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="At least 6 characters"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Confirm Password</Text>
              </View>
              <View style={styles.inputRow}>
                <ShieldCheck size={18} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="Re-type your password"
                  placeholderTextColor="#94a3b8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />
              </View>

              {/* Continue to Step 2 Button */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleNextStep}
                activeOpacity={0.88}
              >
                <LinearGradient
                  colors={['#4f46e5', '#6366f1']}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.btnText}>Continue to Select School</Text>
                  <ChevronRight size={18} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 2: DYNAMIC SCHOOL & CHILD SELECTION */}
          {step === 2 && (
            <View style={styles.inputGroup}>
              {/* SECTION A: DYNAMIC REGISTERED SCHOOLS */}
              <View style={styles.sectionHeaderRow}>
                <Building size={16} color="#4f46e5" />
                <Text style={styles.sectionTitle}>1. Select Your School</Text>
              </View>

              {/* School Search Bar */}
              <View style={styles.inputRow}>
                <Search size={18} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="Search registered schools..."
                  placeholderTextColor="#94a3b8"
                  value={schoolSearch}
                  onChangeText={handleSchoolSearch}
                />
                {loadingSchools && <ActivityIndicator size="small" color="#4f46e5" />}
              </View>

              {/* Dynamic Schools Results Horizontal/Vertical Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.schoolsScroll}
              >
                {schoolsList.map((sch) => {
                  const isSelected = selectedSchool?.id === sch.id;
                  return (
                    <TouchableOpacity
                      key={sch.id}
                      style={[styles.schoolCard, isSelected && styles.schoolCardSelected]}
                      onPress={() => handleSelectSchool(sch)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.schoolCardTop}>
                        <View style={[styles.schoolIconWrap, isSelected && styles.schoolIconWrapSelected]}>
                          <School size={16} color={isSelected ? '#ffffff' : '#4f46e5'} />
                        </View>
                        {isSelected && (
                          <View style={styles.selectedBadge}>
                            <Check size={12} color="#ffffff" />
                          </View>
                        )}
                      </View>
                      <Text style={[styles.schoolNameText, isSelected && styles.schoolNameTextSelected]} numberOfLines={1}>
                        {sch.name}
                      </Text>
                      <View style={styles.schoolInfoRow}>
                        <MapPin size={11} color="#64748b" />
                        <Text style={styles.schoolCityText}>{sch.city || 'City'}</Text>
                        <Text style={styles.schoolCodeBadge}>{sch.code}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Selected School Confirmation Banner */}
              {selectedSchool && (
                <View style={styles.selectedSchoolBanner}>
                  <School size={18} color="#16a34a" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.selectedSchoolTitle}>{selectedSchool.name}</Text>
                    <Text style={styles.selectedSchoolSub}>
                      Code: {selectedSchool.code} • {selectedSchool.board || 'CBSE'} • {selectedSchool.city}
                    </Text>
                  </View>
                  <CheckCircle2 size={18} color="#16a34a" />
                </View>
              )}

              {/* SECTION B: DYNAMIC STUDENT LOOKUP */}
              <View style={[styles.sectionHeaderRow, { marginTop: 14 }]}>
                <GraduationCap size={16} color="#4f46e5" />
                <Text style={styles.sectionTitle}>2. Find & Connect Your Child</Text>
              </View>

              {/* Search Child in School */}
              <View style={styles.inputRow}>
                <Search size={18} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Child Name, Roll No, or Admission No"
                  placeholderTextColor="#94a3b8"
                  value={studentQuery}
                  onChangeText={(q) => {
                    setStudentQuery(q);
                    handleFindStudent(q);
                  }}
                />
                {searchingStudent ? (
                  <ActivityIndicator size="small" color="#4f46e5" />
                ) : (
                  <TouchableOpacity
                    style={styles.findBtn}
                    onPress={() => handleFindStudent()}
                  >
                    <Text style={styles.findBtnText}>Search</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Quick Dummy Roll Number Chips for Instant Demo Testing */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 2, marginBottom: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#64748b' }}>Try Demo Roll:</Text>
                {[
                  { label: 'Roll 101 (Aarav)', query: '101' },
                  { label: 'Roll 102 (Riya)', query: '102' },
                  { label: 'Roll 103 (Rohan)', query: '103' },
                ].map((chip, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={{
                      backgroundColor: '#eef2ff',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#c7d2fe',
                    }}
                    onPress={() => {
                      setStudentQuery(chip.query);
                      handleFindStudent(chip.query);
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: '#4f46e5' }}>{chip.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Dynamic Found Students Results */}
              {foundStudents.length > 0 && !selectedStudent && (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultsHeader}>
                    Found {foundStudents.length} student(s) in {selectedSchool?.name}:
                  </Text>
                  {foundStudents.map((st) => (
                    <TouchableOpacity
                      key={st.id}
                      style={styles.studentResultCard}
                      onPress={() => handleSelectStudent(st)}
                      activeOpacity={0.85}
                    >
                      <View style={styles.studentAvatarBox}>
                        <Text style={styles.studentAvatarText}>
                          {st.name.slice(0, 2).toUpperCase()}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.studentCardName}>{st.name}</Text>
                        <Text style={styles.studentCardSub}>
                          {st.class || 'Student'} • Adm: {st.admissionNo || 'N/A'} • Roll: {st.rollNo || 'N/A'}
                        </Text>
                      </View>
                      <View style={styles.connectChip}>
                        <Text style={styles.connectChipText}>Connect</Text>
                        <ChevronRight size={14} color="#4f46e5" />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Verified Selected Child Card */}
              {selectedStudent ? (
                <View style={styles.verifiedChildCard}>
                  <View style={styles.verifiedCardHeader}>
                    <CheckCircle2 size={18} color="#16a34a" />
                    <Text style={styles.verifiedHeaderTitle}>Student Verified & Ready to Connect</Text>
                  </View>
                  <View style={styles.verifiedDetailsRow}>
                    <View style={styles.verifiedAvatar}>
                      <Text style={styles.verifiedAvatarText}>
                        {selectedStudent.name.slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.verifiedName}>{selectedStudent.name}</Text>
                      <Text style={styles.verifiedClass}>{selectedStudent.class || 'Student'}</Text>
                      <Text style={styles.verifiedMeta}>
                        Admission No: {selectedStudent.admissionNo || 'N/A'} | Roll: {selectedStudent.rollNo || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.changeStudentBtn}
                    onPress={() => {
                      setSelectedStudent(null);
                      setStudentQuery('');
                    }}
                  >
                    <RefreshCw size={13} color="#64748b" />
                    <Text style={styles.changeStudentText}>Select a different student</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* Manual Entry Toggle / Fallback if student not in preloaded DB */
                <View style={styles.manualEntryBox}>
                  <TouchableOpacity
                    style={styles.manualToggleRow}
                    onPress={() => setIsManualEntry(!isManualEntry)}
                  >
                    <Text style={styles.manualToggleText}>
                      {isManualEntry ? '▲ Hide Manual Details' : "▼ Can't find child? Enter Details Manually"}
                    </Text>
                  </TouchableOpacity>

                  {isManualEntry && (
                    <View style={styles.manualFieldsGroup}>
                      <View style={styles.fieldLabelRow}>
                        <Text style={styles.fieldLabel}>Child's Full Name</Text>
                      </View>
                      <View style={styles.inputRow}>
                        <User size={18} color="#94a3b8" />
                        <TextInput
                          style={styles.input}
                          placeholder="e.g. Aarav Sharma"
                          placeholderTextColor="#94a3b8"
                          value={childName}
                          onChangeText={setChildName}
                        />
                      </View>

                      <View style={styles.fieldLabelRow}>
                        <Text style={styles.fieldLabel}>Admission or Roll Number</Text>
                      </View>
                      <View style={styles.inputRow}>
                        <Hash size={18} color="#94a3b8" />
                        <TextInput
                          style={styles.input}
                          placeholder="e.g. ADM-2026-001"
                          placeholderTextColor="#94a3b8"
                          value={admissionNo}
                          onChangeText={setAdmissionNo}
                        />
                      </View>

                      <View style={styles.fieldLabelRow}>
                        <Text style={styles.fieldLabel}>Class & Section</Text>
                      </View>
                      <View style={styles.inputRow}>
                        <GraduationCap size={18} color="#94a3b8" />
                        <TextInput
                          style={styles.input}
                          placeholder="e.g. Class 10 - A"
                          placeholderTextColor="#94a3b8"
                          value={childClass}
                          onChangeText={setChildClass}
                        />
                      </View>
                    </View>
                  )}
                </View>
              )}

              {/* Action Buttons: Back & Complete */}
              <View style={styles.stepButtonsRow}>
                <TouchableOpacity
                  style={styles.backStepBtn}
                  onPress={() => setStep(1)}
                  disabled={submitting}
                >
                  <ChevronLeft size={18} color="#475569" />
                  <Text style={styles.backStepText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, { flex: 1, marginTop: 0 }]}
                  onPress={handleRegister}
                  disabled={submitting}
                  activeOpacity={0.88}
                >
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.btnGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {submitting ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <>
                        <CheckCircle2 size={18} color="#ffffff" />
                        <Text style={styles.btnText}>Complete & Connect</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Sign In Footer Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroGradient: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 20 : 60,
    paddingBottom: 28,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  appSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '700',
    marginTop: 2,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  stepPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  stepPillActive: {
    backgroundColor: '#ffffff',
  },
  stepPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  stepPillTextActive: {
    color: '#4f46e5',
  },
  stepConnector: {
    width: 14,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  formWrap: {
    flex: 1,
    marginTop: -16,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  formContent: {
    padding: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
  },
  welcomeSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '600',
    marginBottom: 16,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1e293b',
  },
  fieldLabelRow: {
    marginTop: 4,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1.2,
    borderColor: '#e2e8f0',
  },
  countryCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#eef2ff',
    borderColor: '#4f46e5',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
  },
  chipTextActive: {
    color: '#4f46e5',
  },
  schoolsScroll: {
    gap: 10,
    paddingVertical: 6,
  },
  schoolCard: {
    width: 175,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  schoolCardSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#f5f3ff',
  },
  schoolCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  schoolIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolIconWrapSelected: {
    backgroundColor: '#4f46e5',
  },
  selectedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolNameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  schoolNameTextSelected: {
    color: '#4f46e5',
  },
  schoolInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  schoolCityText: {
    fontSize: 11,
    color: '#64748b',
    flex: 1,
  },
  schoolCodeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4f46e5',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  selectedSchoolBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1.2,
    borderColor: '#bbf7d0',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  selectedSchoolTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803d',
  },
  selectedSchoolSub: {
    fontSize: 11,
    color: '#166534',
    marginTop: 2,
  },
  findBtn: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  findBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  resultsContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resultsHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 2,
  },
  studentResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  studentAvatarBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentAvatarText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#4f46e5',
  },
  studentCardName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  studentCardSub: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  connectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  connectChipText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4f46e5',
  },
  verifiedChildCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#86efac',
    gap: 10,
  },
  verifiedCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803d',
  },
  verifiedDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  verifiedAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#22c55e',
  },
  verifiedAvatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#15803d',
  },
  verifiedName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
  },
  verifiedClass: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16a34a',
    marginTop: 1,
  },
  verifiedMeta: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  changeStudentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  changeStudentText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  manualEntryBox: {
    marginTop: 4,
  },
  manualToggleRow: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  manualToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366f1',
  },
  manualFieldsGroup: {
    gap: 8,
    marginTop: 4,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionBtn: {
    marginTop: 18,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
  },
  btnGradient: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 14,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  stepButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  backStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
  },
  backStepText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4f46e5',
  },
});
