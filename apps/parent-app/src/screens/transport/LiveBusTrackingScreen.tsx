import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Platform, StatusBar, Dimensions, Linking, RefreshControl, Alert 
} from 'react-native';
import { 
  ChevronLeft, Bell, Bus, MapPin, Clock, CheckCircle2, 
  Navigation, Phone, ShieldAlert, RefreshCw, Gauge, 
  ShieldCheck, Volume2, Sparkles, UserCheck, Video, Sun, Moon, Radio, AlertCircle, Timer
} from 'lucide-react-native';
import UniversalMapView from '../../components/UniversalMapView';
import { useParentAuth } from '../../context/ParentAuthContext';
import { parentApi } from '../../lib/api';

const { width } = Dimensions.get('window');

export default function LiveBusTrackingScreen({ navigation }: any) {
  const { currentChild, user } = useParentAuth();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mapConfig, setMapConfig] = useState<any>(null);

  // Shift selection: Morning (Home ➔ School) vs Afternoon (School ➔ Home)
  const [activeShift, setActiveShift] = useState<'MORNING' | 'AFTERNOON'>('MORNING');

  // Dynamic Fleet & Route Details
  const [assignedBus, setAssignedBus] = useState<string>(currentChild?.busNo || "Bus #01");
  const [busRegistration, setBusRegistration] = useState<string>("DL 01 AB 4321");
  const [driverName, setDriverName] = useState<string>("Ram Singh");
  const [driverPhone, setDriverPhone] = useState<string>("+91 98111 22334");
  const [routeName, setRouteName] = useState<string>("Route 1 Dwarka Belt");
  const [pickupStopName, setPickupStopName] = useState<string>("Main Market");
  const [pickupScheduledTime, setPickupScheduledTime] = useState<string>("07:35 AM");
  const [expectedArrivalTime, setExpectedArrivalTime] = useState<string>("07:34 AM");
  const [delayMinutes, setDelayMinutes] = useState<number>(0);
  const [delayStatusText, setDelayStatusText] = useState<string>("🟢 On Time (No Delays)");

  // Real-Time Telemetry State
  const [liveSpeed, setLiveSpeed] = useState<number>(32);
  const [liveHeading, setLiveHeading] = useState<number>(45);
  const [exactLocationName, setExactLocationName] = useState<string>("Sector 22 Arterial Road, Opp. City Center Mall");
  const [nextStopTitle, setNextStopTitle] = useState<string>("Main Market (Pickup Point)");
  const [etaMinutes, setEtaMinutes] = useState<number>(3);
  const [etaSecondsCountdown, setEtaSecondsCountdown] = useState<number>(185);
  const [distanceRemainingText, setDistanceRemainingText] = useState<string>("850 m");
  const [distanceRemainingMeters, setDistanceRemainingMeters] = useState<number>(850);
  const [tripProgressPercent, setTripProgressPercent] = useState<number>(25);
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(1);
  const [rideStatusText, setRideStatusText] = useState<string>("🟢 Bus on Route • Approaching Pickup");
  const [studentStatus, setStudentStatus] = useState<'WAITING' | 'BOARDING' | 'ON_BOARD' | 'ARRIVED'>('WAITING');
  const [tripCompleted, setTripCompleted] = useState<boolean>(false);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({ lat: 28.5705, lng: 77.0632 });

  // Dynamic Route Stops for Morning vs Afternoon with Scheduled, Expected, and Delay details
  const morningStops = [
    { 
      name: 'Sector 21 Metro Terminal', 
      scheduledTime: '07:15 AM', 
      expectedTime: '07:16 AM', 
      delayText: 'Departed (+1m)', 
      delayStatus: 'ON_TIME', 
      status: 'Completed', 
      completed: true, 
      isPickup: false, 
      isSchool: false, 
      latitude: 28.5518, 
      longitude: 77.0583 
    },
    { 
      name: 'Main Market (Pickup)', 
      scheduledTime: '07:35 AM', 
      expectedTime: '07:34 AM', 
      delayText: 'On Time 🟢 (-1m early)', 
      delayStatus: 'ON_TIME', 
      status: 'Next Stop', 
      completed: false, 
      isPickup: true, 
      isSchool: false, 
      latitude: 28.5705, 
      longitude: 77.0632 
    },
    { 
      name: 'Maple Park', 
      scheduledTime: '07:48 AM', 
      expectedTime: '07:47 AM', 
      delayText: 'On Time 🟢', 
      delayStatus: 'ON_TIME', 
      status: 'Upcoming', 
      completed: false, 
      isPickup: false, 
      isSchool: false, 
      latitude: 28.5833, 
      longitude: 77.0667 
    },
    { 
      name: 'Sector 52', 
      scheduledTime: '08:00 AM', 
      expectedTime: '08:00 AM', 
      delayText: 'On Schedule 🟢', 
      delayStatus: 'ON_TIME', 
      status: 'Upcoming', 
      completed: false, 
      isPickup: false, 
      isSchool: false, 
      latitude: 28.5880, 
      longitude: 77.0674 
    },
    { 
      name: 'DPS Campus (School)', 
      scheduledTime: '08:15 AM', 
      expectedTime: '08:14 AM', 
      delayText: 'On Time 🟢', 
      delayStatus: 'ON_TIME', 
      status: 'Upcoming', 
      completed: false, 
      isPickup: false, 
      isSchool: true, 
      latitude: 28.5901, 
      longitude: 77.0700 
    },
  ];

  const afternoonStops = [
    { 
      name: 'DPS Campus (School)', 
      scheduledTime: '02:15 PM', 
      expectedTime: '02:15 PM', 
      delayText: 'Departed On Time', 
      delayStatus: 'ON_TIME', 
      status: 'Completed', 
      completed: true, 
      isPickup: false, 
      isSchool: true, 
      latitude: 28.5901, 
      longitude: 77.0700 
    },
    { 
      name: 'Sector 52', 
      scheduledTime: '02:28 PM', 
      expectedTime: '02:27 PM', 
      delayText: 'On Time 🟢', 
      delayStatus: 'ON_TIME', 
      status: 'Next Stop', 
      completed: false, 
      isPickup: false, 
      isSchool: false, 
      latitude: 28.5880, 
      longitude: 77.0674 
    },
    { 
      name: 'Maple Park', 
      scheduledTime: '02:42 PM', 
      expectedTime: '02:42 PM', 
      delayText: 'On Schedule 🟢', 
      delayStatus: 'ON_TIME', 
      status: 'Upcoming', 
      completed: false, 
      isPickup: false, 
      isSchool: false, 
      latitude: 28.5833, 
      longitude: 77.0667 
    },
    { 
      name: 'Main Market (Drop)', 
      scheduledTime: '02:55 PM', 
      expectedTime: '02:54 PM', 
      delayText: 'On Time 🟢 (-1m)', 
      delayStatus: 'ON_TIME', 
      status: 'Upcoming', 
      completed: false, 
      isPickup: true, 
      isSchool: false, 
      latitude: 28.5705, 
      longitude: 77.0632 
    },
    { 
      name: 'Sector 21 Metro Terminal', 
      scheduledTime: '03:15 PM', 
      expectedTime: '03:14 PM', 
      delayText: 'On Schedule 🟢', 
      delayStatus: 'ON_TIME', 
      status: 'Upcoming', 
      completed: false, 
      isPickup: false, 
      isSchool: false, 
      latitude: 28.5518, 
      longitude: 77.0583 
    },
  ];

  const [routeStops, setRouteStops] = useState<any[]>(morningStops);

  // Load Transport Data
  const loadTransportData = useCallback(async () => {
    try {
      try {
        const mapRes = await parentApi.getMapConfig();
        if (mapRes && mapRes.success && mapRes.data) {
          setMapConfig(mapRes.data);
        }
      } catch (e) {}

      try {
        const assignRes = await parentApi.getStudentAssignments();
        if (assignRes && assignRes.success && assignRes.data?.assignments) {
          const assignments: any[] = assignRes.data.assignments;
          const childId = currentChild?.id || (currentChild as any)?._id;
          const childAssignment = assignments.find((a: any) => 
            (a.studentId?._id && a.studentId._id === childId) ||
            (a.studentId?.id && a.studentId.id === childId) ||
            (a.studentId?.name && currentChild?.name && a.studentId.name.toLowerCase() === currentChild.name.toLowerCase())
          ) || assignments[0];

          if (childAssignment) {
            if (childAssignment.busId) {
              setAssignedBus(childAssignment.busId.busNumber || childAssignment.busId.registrationNo || "Bus #01");
              if (childAssignment.busId.registrationNo) setBusRegistration(childAssignment.busId.registrationNo);
              if (childAssignment.busId.driverName) setDriverName(childAssignment.busId.driverName);
            }
            if (childAssignment.routeId) {
              setRouteName(childAssignment.routeId.routeName || "Route 1 Dwarka Belt");
            }
            if (childAssignment.pickupStopId) {
              setPickupStopName(childAssignment.pickupStopId.stopName || childAssignment.pickupStopId.name || "Main Market");
              setPickupScheduledTime(childAssignment.pickupStopId.pickupTime || childAssignment.pickupStopId.scheduledTimeMorning || "07:35 AM");
            }
          }
        }
      } catch (e) {}

      try {
        const fleetRes = await parentApi.getBusLocations();
        if (fleetRes && fleetRes.success && fleetRes.data?.buses && fleetRes.data.buses.length > 0) {
          const fleetBuses = fleetRes.data.buses;
          const matchingBus = fleetBuses.find((b: any) => 
            b.busNumber === assignedBus || b.registrationNo === assignedBus || b.routeName === routeName
          ) || fleetBuses[0];

          if (matchingBus) {
            setAssignedBus(matchingBus.busNumber || matchingBus.registrationNo || assignedBus);
            if (matchingBus.registrationNo) setBusRegistration(matchingBus.registrationNo);
            if (matchingBus.driverName) setDriverName(matchingBus.driverName);
            if (matchingBus.driverId?.phone) setDriverPhone(matchingBus.driverId.phone);
            if (matchingBus.routeName) setRouteName(matchingBus.routeName);
          }
        }
      } catch (e) {}

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentChild, assignedBus, routeName]);

  useEffect(() => {
    loadTransportData();
  }, [loadTransportData]);

  // Handle Shift Toggle
  const handleShiftSelect = (shift: 'MORNING' | 'AFTERNOON') => {
    setActiveShift(shift);
    setRouteStops(shift === 'MORNING' ? morningStops : afternoonStops);
    setTripCompleted(false);
    if (shift === 'MORNING') {
      setNextStopTitle("Main Market (Pickup Point)");
      setPickupScheduledTime("07:35 AM");
      setExpectedArrivalTime("07:34 AM");
      setExactLocationName("Sector 22 Arterial Road, Opp. City Center Mall");
      setStudentStatus("WAITING");
      setDelayStatusText("🟢 On Time (No Delays)");
    } else {
      setNextStopTitle("Main Market (Drop Point)");
      setPickupScheduledTime("02:55 PM");
      setExpectedArrivalTime("02:54 PM");
      setExactLocationName("Departed DPS Campus, entering Sector 52 Road");
      setStudentStatus("ON_BOARD");
      setDelayStatusText("🟢 On Time (No Delays)");
    }
  };

  // Real-time 1-Second Countdown Clock
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setEtaSecondsCountdown((prev) => (prev <= 1 ? 180 : prev - 1));
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, []);

  // Telemetry callback received from the Live Street Map
  const handleMapTelemetry = useCallback((data: any) => {
    if (!data) return;

    if (data.speed !== undefined) setLiveSpeed(data.speed);
    if (data.heading !== undefined) setLiveHeading(data.heading);
    if (data.latitude && data.longitude) {
      setCurrentCoords({ lat: data.latitude, lng: data.longitude });
    }
    if (data.exactLocationName) setExactLocationName(data.exactLocationName);
    if (data.nextStop) setNextStopTitle(data.nextStop);
    if (data.etaMinutes !== undefined) {
      setEtaMinutes(data.etaMinutes);
      setEtaSecondsCountdown((curr) => {
        const targetSec = data.etaMinutes * 60;
        return Math.abs(curr - targetSec) > 60 ? targetSec : curr;
      });
    }
    if (data.distanceLeftText) setDistanceRemainingText(data.distanceLeftText);
    if (data.distanceLeftMeters !== undefined) setDistanceRemainingMeters(data.distanceLeftMeters);
    if (data.progressPercent !== undefined) setTripProgressPercent(data.progressPercent);
    if (data.statusText) setRideStatusText(data.statusText);
    if (data.studentStatus) setStudentStatus(data.studentStatus);
    if (data.tripCompleted !== undefined) setTripCompleted(data.tripCompleted);

    if (data.currentStopIndex !== undefined) {
      setCurrentStopIndex(data.currentStopIndex);
      setRouteStops((prevStops) =>
        prevStops.map((stop, idx) => ({
          ...stop,
          completed: idx < data.currentStopIndex,
          status: idx < data.currentStopIndex ? 'Completed' : (idx === data.currentStopIndex ? 'Next Stop' : 'Upcoming')
        }))
      );
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTransportData();
  };

  const handleCallDriver = () => {
    const cleanPhone = driverPhone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleanPhone}`).catch(() => {});
  };

  const handleEmergencySOS = () => {
    Linking.openURL('tel:112').catch(() => {});
  };

  const handleVoiceAnnouncement = () => {
    const isMorning = activeShift === 'MORNING';
    const actionWord = isMorning ? 'pickup' : 'drop';
    const textToSpeak = `School Bus number 01 is scheduled for ${pickupScheduledTime}, and expected at ${expectedArrivalTime} (${delayStatusText}). Current location: ${exactLocationName}.`;
    
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      Alert.alert("Bus Schedule & Delay Alert", textToSpeak);
    }
  };

  const childName = currentChild?.name || 'Your Child';
  const childClass = currentChild?.class || 'Class 10';
  const schoolName = currentChild?.schoolName || user?.schoolName || 'Delhi Public School Campus';

  const formattedCountdown = `${Math.floor(etaSecondsCountdown / 60)}m : ${String(etaSecondsCountdown % 60).padStart(2, '0')}s`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* 1. TOP APP BAR */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          {navigation.canGoBack() && (
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <ChevronLeft size={22} color="#0f172a" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.pageTitle}>Live Bus Tracking</Text>
            <Text style={styles.childHeaderSub}>{childName} • {childClass}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.voiceBtn} onPress={handleVoiceAnnouncement} activeOpacity={0.7} accessibilityLabel="Voice Alert">
            <Volume2 size={17} color="#2563eb" />
          </TouchableOpacity>
          <View style={styles.liveStreamBadge}>
            <View style={styles.liveStreamDot} />
            <Text style={styles.liveStreamText}>LIVE</Text>
          </View>
          <TouchableOpacity style={styles.refreshIconBtn} onPress={handleRefresh} activeOpacity={0.7}>
            <RefreshCw size={17} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#4f46e5']} />}
      >

        {/* 2. DUAL COMMUTE ROUTE SWITCHER */}
        <View style={styles.shiftSelectorCard}>
          <TouchableOpacity 
            style={[styles.shiftTabBtn, activeShift === 'MORNING' && styles.shiftTabBtnActive]} 
            onPress={() => handleShiftSelect('MORNING')}
            activeOpacity={0.8}
          >
            <Sun size={15} color={activeShift === 'MORNING' ? '#2563eb' : '#64748b'} />
            <Text style={[styles.shiftTabText, activeShift === 'MORNING' && styles.shiftTabTextActive]} numberOfLines={1}>
              Morning Pickup
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.shiftTabBtn, activeShift === 'AFTERNOON' && styles.shiftTabBtnActive]} 
            onPress={() => handleShiftSelect('AFTERNOON')}
            activeOpacity={0.8}
          >
            <Moon size={15} color={activeShift === 'AFTERNOON' ? '#2563eb' : '#64748b'} />
            <Text style={[styles.shiftTabText, activeShift === 'AFTERNOON' && styles.shiftTabTextActive]} numberOfLines={1}>
              Afternoon Drop
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2B. QUICK SCHEDULE & PUNCTUALITY STRIP (Directly above the Map) */}
        <View style={styles.quickScheduleStrip}>
          <View style={styles.quickScheduleItem}>
            <Clock size={12} color="#64748b" />
            <Text style={styles.quickScheduleLabel}>Sched:</Text>
            <Text style={styles.quickScheduleValue}>{pickupScheduledTime}</Text>
          </View>
          <View style={styles.quickScheduleDivider} />
          <View style={styles.quickScheduleItem}>
            <Navigation size={12} color="#2563eb" />
            <Text style={styles.quickScheduleLabel}>Exp:</Text>
            <Text style={[styles.quickScheduleValue, { color: '#2563eb' }]}>{expectedArrivalTime}</Text>
          </View>
          <View style={styles.quickScheduleDivider} />
          <View style={[styles.quickStatusBadge, delayMinutes === 0 ? styles.quickStatusOnTime : styles.quickStatusDelayed]}>
            <View style={[styles.miniDotPulse, { backgroundColor: delayMinutes === 0 ? '#16a34a' : '#ef4444' }]} />
            <Text style={[styles.quickStatusText, { color: delayMinutes === 0 ? '#15803d' : '#b91c1c' }]}>
              {delayMinutes === 0 ? 'ON TIME 🟢' : `+${delayMinutes}m DELAY ⚠️`}
            </Text>
          </View>
        </View>

        {/* 3. HERO 3D LIVE MAP VIEW */}
        <View style={styles.mapContainerCard}>
          <UniversalMapView
            shift={activeShift}
            schoolLocation={{
              latitude: 28.5901,
              longitude: 77.0700,
              name: schoolName
            }}
            pickupLocation={{
              latitude: 28.5705,
              longitude: 77.0632,
              name: `${childName}'s Stop: ${pickupStopName}`
            }}
            routeStops={routeStops}
            mapConfig={mapConfig}
            height={380}
            allowExpand={true}
            onTelemetryUpdate={handleMapTelemetry}
          />
        </View>

        {/* 4. EXACT LIVE LOCATION CALLOUT CARD */}
        <View style={styles.exactLocationCard}>
          <View style={styles.exactPinBox}>
            <View style={styles.exactRadarPulse} />
            <Radio size={16} color="#2563eb" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.exactLocHeaderRow}>
              <Text style={styles.exactLocLabel}>CURRENT EXACT BUS LOCATION</Text>
              <View style={styles.gpsFixBadge}>
                <Text style={styles.gpsFixText}>GPS ±3m High Precision</Text>
              </View>
            </View>
            <Text style={styles.exactLocationNameText}>{exactLocationName}</Text>
            <Text style={styles.exactCoordsSubText}>
              Coordinates: {currentCoords.lat.toFixed(4)}° N, {currentCoords.lng.toFixed(4)}° E • Heading: {liveHeading}°
            </Text>
          </View>
        </View>

        {/* 5. SCHEDULE & DELAY PUNCTUALITY CARD WITH LIVE TRAFFIC TELEMETRY */}
        <View style={styles.punctualityCard}>
          <View style={styles.punctualityHeaderRow}>
            <View style={[styles.punctualityIconWrap, delayMinutes > 0 && { backgroundColor: '#fee2e2' }]}>
              <Timer size={18} color={delayMinutes === 0 ? '#16a34a' : '#dc2626'} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.punctualityTitle}>Schedule & Delay Status</Text>
              <Text style={styles.punctualitySub}>Live Route Monitoring for {pickupStopName}</Text>
            </View>
            <View style={[styles.onTimeBadge, delayMinutes > 0 && styles.delayedBadge]}>
              <View style={[styles.greenPulseDot, delayMinutes > 0 && { backgroundColor: '#ef4444' }]} />
              <Text style={[styles.onTimeBadgeText, delayMinutes > 0 && { color: '#b91c1c' }]}>
                {delayMinutes === 0 ? 'ON TIME 🟢' : `+${delayMinutes} MIN DELAY ⚠️`}
              </Text>
            </View>
          </View>

          <View style={styles.scheduleComparisonRow}>
            <View style={styles.scheduleBox}>
              <Text style={styles.scheduleBoxLabel}>SCHEDULED</Text>
              <Text style={styles.scheduleBoxValue}>{pickupScheduledTime}</Text>
              <Text style={styles.scheduleBoxFootnote}>Official</Text>
            </View>

            <View style={styles.scheduleDivider} />

            <View style={styles.scheduleBox}>
              <Text style={styles.scheduleBoxLabel}>EXPECTED</Text>
              <Text style={[styles.scheduleBoxValue, { color: delayMinutes === 0 ? '#2563eb' : '#ea580c' }]}>
                {expectedArrivalTime}
              </Text>
              <Text style={styles.scheduleBoxFootnote}>GPS Live</Text>
            </View>

            <View style={styles.scheduleDivider} />

            <View style={styles.scheduleBox}>
              <Text style={styles.scheduleBoxLabel}>STATUS</Text>
              <Text style={[styles.scheduleBoxValue, { color: delayMinutes === 0 ? '#16a34a' : '#dc2626' }]}>
                {delayMinutes === 0 ? '0 mins' : `+${delayMinutes} mins`}
              </Text>
              <Text style={styles.scheduleBoxFootnote}>
                {delayMinutes === 0 ? 'On Time' : 'Traffic Delay'}
              </Text>
            </View>
          </View>

          <View style={[styles.trafficAlertRow, delayMinutes > 0 && styles.trafficAlertRowDelayed]}>
            <AlertCircle size={13} color={delayMinutes === 0 ? '#15803d' : '#b91c1c'} />
            <Text style={[styles.trafficAlertText, delayMinutes > 0 && { color: '#991b1b' }]}>
              {delayMinutes === 0 
                ? 'Route traffic is smooth. Bus is operating strictly on-schedule.' 
                : `Traffic congestion detected ahead. Driver reported a +${delayMinutes} min delay.`}
            </Text>
          </View>

          {/* Real-time Delay Test Scenario Switcher */}
          <View style={styles.delaySimulationRow}>
            <Text style={styles.delaySimulationLabel}>Simulate Traffic:</Text>
            <TouchableOpacity 
              style={[styles.simDelayBtn, delayMinutes === 0 && styles.simDelayBtnActive]}
              onPress={() => {
                setDelayMinutes(0);
                setDelayStatusText("🟢 On Time (No Delays)");
                setExpectedArrivalTime(activeShift === 'MORNING' ? "07:34 AM" : "02:54 PM");
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.simDelayText, delayMinutes === 0 && styles.simDelayTextActive]}>🟢 On Time (0m)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.simDelayBtn, delayMinutes === 4 && styles.simDelayBtnActive]}
              onPress={() => {
                setDelayMinutes(4);
                setDelayStatusText("⚠️ +4 min Signal Delay");
                setExpectedArrivalTime(activeShift === 'MORNING' ? "07:39 AM" : "02:59 PM");
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.simDelayText, delayMinutes === 4 && styles.simDelayTextActive]}>⚠️ +4m Delay</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.simDelayBtn, delayMinutes === 10 && styles.simDelayBtnActive]}
              onPress={() => {
                setDelayMinutes(10);
                setDelayStatusText("🚨 +10 min Heavy Traffic");
                setExpectedArrivalTime(activeShift === 'MORNING' ? "07:45 AM" : "03:05 PM");
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.simDelayText, delayMinutes === 10 && styles.simDelayTextActive]}>🚨 +10m Traffic</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. SMART CHILD ATTENDANCE & RFID BOARDING CARD */}
        <View style={[
          styles.childBoardingCard,
          studentStatus === 'ON_BOARD' && styles.cardOnBoard,
          studentStatus === 'ARRIVED' && styles.cardArrived,
        ]}>
          <View style={styles.childCardLeft}>
            <View style={[
              styles.childAvatarCircle,
              studentStatus === 'ON_BOARD' && { backgroundColor: '#dcfce7', borderColor: '#16a34a' },
              studentStatus === 'ARRIVED' && { backgroundColor: '#f3e8ff', borderColor: '#7c3aed' },
            ]}>
              <Text style={{ fontSize: 20 }}>
                {studentStatus === 'ARRIVED' ? '🎓' : (studentStatus === 'ON_BOARD' ? '🎒' : '👦')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.studentNameStatusRow}>
                <Text style={styles.studentNameText}>{childName}</Text>
                <View style={[
                  styles.boardingPill,
                  studentStatus === 'WAITING' && styles.pillWaiting,
                  studentStatus === 'BOARDING' && styles.pillBoarding,
                  studentStatus === 'ON_BOARD' && styles.pillOnBoard,
                  studentStatus === 'ARRIVED' && styles.pillArrived,
                ]}>
                  <Text style={[
                    styles.boardingPillText,
                    studentStatus === 'WAITING' && styles.textWaiting,
                    studentStatus === 'BOARDING' && styles.textBoarding,
                    studentStatus === 'ON_BOARD' && styles.textOnBoard,
                    studentStatus === 'ARRIVED' && styles.textArrived,
                  ]}>
                    {studentStatus === 'WAITING' && '⏳ Waiting at Stop'}
                    {studentStatus === 'BOARDING' && '🟡 Boarding Bus #01...'}
                    {studentStatus === 'ON_BOARD' && '✅ On Board • Seat #14'}
                    {studentStatus === 'ARRIVED' && (activeShift === 'MORNING' ? '🏫 Safely at School' : '🏡 Safely Home with Parent')}
                  </Text>
                </View>
              </View>
              <Text style={styles.boardingSubText}>
                {studentStatus === 'WAITING' && `Pickup Stop: ${pickupStopName} (Scheduled ${pickupScheduledTime} • Expected ${expectedArrivalTime})`}
                {studentStatus === 'BOARDING' && 'Driver has halted at stop. Doors open for safe boarding.'}
                {studentStatus === 'ON_BOARD' && `Air Conditioned (22°C) • En route to ${activeShift === 'MORNING' ? schoolName : 'Home Drop'}`}
                {studentStatus === 'ARRIVED' && (activeShift === 'MORNING' ? 'Deboarded safely inside school campus. RFID Marked.' : 'Deboarded safely at Main Market and handed over to parent.')}
              </Text>
            </View>
          </View>
        </View>

        {/* 7. OLA / UBER STYLE FLOATING RIDE STATUS CARD */}
        <View style={styles.olaRideCard}>
          <View style={styles.rideStatusStrip}>
            <View style={styles.pulseGreenBeacon}>
              <View style={styles.innerGreenBeacon} />
            </View>
            <Text style={styles.rideStatusText}>{rideStatusText}</Text>
            <View style={styles.speedCapsule}>
              <Gauge size={13} color="#2563eb" />
              <Text style={styles.speedCapsuleText}>{liveSpeed} km/h</Text>
            </View>
          </View>

          <View style={styles.etaHeroSection}>
            <View style={styles.etaLeftColumn}>
              <Text style={styles.etaLabelText}>
                {tripCompleted ? 'TRIP COMPLETED' : 'ARRIVING IN'}
              </Text>
              <View style={styles.etaBigNumberRow}>
                <Text style={styles.etaBigMinutes}>
                  {tripCompleted ? '0' : etaMinutes}
                </Text>
                <Text style={styles.etaBigUnit}>MINS</Text>
              </View>
              <View style={styles.countdownPill}>
                <Clock size={12} color="#ea580c" />
                <Text style={styles.countdownPillText}>
                  {tripCompleted ? 'Trip Finished ✅' : `${formattedCountdown} remaining`}
                </Text>
              </View>
            </View>

            <View style={styles.etaDividerVertical} />

            <View style={styles.etaRightColumn}>
              <Text style={styles.nextStopSmallLabel}>
                {tripCompleted ? 'FINAL DESTINATION' : 'NEXT STOPPED'}
              </Text>
              <Text style={styles.nextStopBigName} numberOfLines={2}>{nextStopTitle}</Text>
              <View style={styles.distanceMetricRow}>
                <MapPin size={13} color="#16a34a" />
                <Text style={styles.distanceValueText}>{distanceRemainingText} away</Text>
              </View>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${Math.min(100, Math.max(10, tripProgressPercent))}%` }]} />
            </View>
            <View style={styles.progressLabelsRow}>
              <View style={styles.checkpointLabelItem}>
                <View style={[styles.checkpointDot, tripProgressPercent >= 10 && styles.checkpointDotActive]} />
                <Text style={styles.checkpointText}>{activeShift === 'MORNING' ? 'Sector 21' : 'School Gate'}</Text>
              </View>
              <View style={styles.checkpointLabelItem}>
                <View style={[styles.checkpointDot, tripProgressPercent >= 35 && styles.checkpointDotActive]} />
                <Text style={[styles.checkpointText, styles.checkpointTextHighlight]}>
                  {activeShift === 'MORNING' ? '⭐ Pickup' : 'Sector 52'}
                </Text>
              </View>
              <View style={styles.checkpointLabelItem}>
                <View style={[styles.checkpointDot, tripProgressPercent >= 70 && styles.checkpointDotActive]} />
                <Text style={styles.checkpointText}>
                  {activeShift === 'MORNING' ? 'Sector 52' : '⭐ Drop Stop'}
                </Text>
              </View>
              <View style={styles.checkpointLabelItem}>
                <View style={[styles.checkpointDot, tripProgressPercent >= 98 && styles.checkpointDotActive]} />
                <Text style={styles.checkpointText}>
                  {activeShift === 'MORNING' ? '🏫 School' : '🏡 Terminal'}
                </Text>
              </View>
            </View>
          </View>

          {/* Metrics 4-Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricSubLabel}>SCHEDULED</Text>
              <Text style={styles.metricValueLarge}>{pickupScheduledTime}</Text>
              <Text style={styles.metricFootnote}>Child Stop 📍</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricSubLabel}>EXPECTED</Text>
              <Text style={[styles.metricValueLarge, { color: '#2563eb' }]}>{expectedArrivalTime}</Text>
              <Text style={styles.metricFootnote}>Live GPS 🎯</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricSubLabel}>PUNCTUALITY</Text>
              <Text style={[styles.metricValueLarge, { color: '#16a34a' }]}>On Time 🟢</Text>
              <Text style={styles.metricFootnote}>0m Delay</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricSubLabel}>LIVE SPEED</Text>
              <Text style={styles.metricValueLarge}>{liveSpeed} <Text style={styles.metricUnitSmall}>km/h</Text></Text>
              <Text style={styles.metricFootnote}>Safe Driving ✅</Text>
            </View>
          </View>

          {/* Driver Drawer */}
          <View style={styles.driverDrawerCard}>
            <View style={styles.driverLeftInfo}>
              <View style={styles.driverAvatarBadge}>
                <Text style={styles.driverAvatarInitial}>👨‍✈️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.driverNameRow}>
                  <Text style={styles.driverNameText}>{driverName}</Text>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>★ 4.9</Text>
                  </View>
                </View>
                <Text style={styles.busPlateText}>🚌 {assignedBus} • {busRegistration}</Text>
                <View style={styles.verificationRow}>
                  <ShieldCheck size={12} color="#16a34a" />
                  <Text style={styles.verificationText}>Police Verified • 8 Yrs Experience</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButtonsCol}>
              <TouchableOpacity style={styles.callDriverBtn} onPress={handleCallDriver} activeOpacity={0.85}>
                <Phone size={14} color="#ffffff" />
                <Text style={styles.callDriverBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sosButton} onPress={handleEmergencySOS} activeOpacity={0.85}>
                <ShieldAlert size={14} color="#ef4444" />
                <Text style={styles.sosButtonText}>SOS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 8. LIVE VEHICLE SAFETY & SURVEILLANCE BAR */}
        <View style={styles.safetySurveillanceCard}>
          <View style={styles.safetyItem}>
            <Video size={16} color="#2563eb" />
            <Text style={styles.safetyText}>2 Live CCTV Cameras Active</Text>
          </View>
          <View style={styles.safetyDivider} />
          <View style={styles.safetyItem}>
            <ShieldCheck size={16} color="#16a34a" />
            <Text style={styles.safetyText}>Speed Limit: 40 km/h Monitored</Text>
          </View>
        </View>

        {/* 9. EXPANDABLE ROUTE STOPS TIMELINE WITH SCHEDULED & DELAY DETAILS */}
        <View style={styles.timelineSectionHeader}>
          <Text style={styles.sectionHeaderTitle}>
            {activeShift === 'MORNING' ? 'Morning Route Stops (To School)' : 'Afternoon Return Stops (To Home)'}
          </Text>
          <Text style={styles.sectionHeaderSub}>Complete schedule, expected time & delay breakdown</Text>
        </View>

        <View style={styles.stopsTimelineCard}>
          {routeStops.map((stop, idx) => {
            const isNext = stop.status === 'Next Stop';
            const isCompleted = stop.completed;
            const isPickup = stop.isPickup;
            const isFinal = stop.isSchool;

            return (
              <View key={idx} style={[styles.timelineItemRow, isNext && styles.timelineItemRowActive]}>
                <View style={styles.timelineLineCol}>
                  <View style={[
                    styles.stopPinCircle,
                    isCompleted && styles.stopPinCompleted,
                    isNext && styles.stopPinNext,
                    !isCompleted && !isNext && styles.stopPinUpcoming,
                    isPickup && styles.stopPinPickupHighlight
                  ]}>
                    {isCompleted ? (
                      <CheckCircle2 size={14} color="#ffffff" />
                    ) : isPickup ? (
                      <Text style={{ fontSize: 11 }}>📍</Text>
                    ) : isFinal ? (
                      <Text style={{ fontSize: 11 }}>🏫</Text>
                    ) : (
                      <View style={[styles.innerMiniDot, isNext && { backgroundColor: '#ffffff' }]} />
                    )}
                  </View>
                  {idx < routeStops.length - 1 && (
                    <View style={[styles.verticalConnectingLine, isCompleted && styles.connectingLineCompleted]} />
                  )}
                </View>

                <View style={styles.stopInfoCol}>
                  <View style={styles.stopHeaderRow}>
                    <View style={styles.stopTitleFlexRow}>
                      <Text style={[styles.stopMainName, isNext && styles.stopMainNameActive, isPickup && styles.stopMainNamePickup]}>
                        {stop.name}
                      </Text>
                      {isPickup && (
                        <View style={styles.childPickupBadge}>
                          <Text style={styles.childPickupBadgeText}>
                            {activeShift === 'MORNING' ? `${childName}'s Pickup` : `${childName}'s Drop`}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={[
                      styles.stopStatusPill,
                      isCompleted && styles.pillCompleted,
                      isNext && styles.pillNext,
                      !isCompleted && !isNext && styles.pillUpcoming
                    ]}>
                      <Text style={[
                        styles.stopStatusPillText,
                        isCompleted && styles.pillTextCompleted,
                        isNext && styles.pillTextNext,
                        !isCompleted && !isNext && styles.pillTextUpcoming
                      ]}>
                        {stop.status}
                      </Text>
                    </View>
                  </View>

                  {/* Scheduled vs Expected & Delay Chips */}
                  <View style={styles.stopTimingsRow}>
                    <View style={styles.timingChip}>
                      <Text style={styles.timingChipLabel}>Sched:</Text>
                      <Text style={styles.timingChipValue}>{stop.scheduledTime}</Text>
                    </View>
                    <View style={styles.timingChip}>
                      <Text style={styles.timingChipLabel}>{isCompleted ? 'Act:' : 'Exp:'}</Text>
                      <Text style={[styles.timingChipValue, { color: '#2563eb' }]}>{stop.expectedTime}</Text>
                    </View>
                    <View style={[styles.timingChip, styles.timingChipPunctuality]}>
                      <Text style={[styles.timingChipValue, { color: '#16a34a' }]}>{stop.delayText}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* 10. SAFETY & HELPLINE FOOTER */}
        <View style={styles.safetyFooterCard}>
          <ShieldAlert size={20} color="#6366f1" />
          <View style={{ flex: 1 }}>
            <Text style={styles.safetyFooterTitle}>SchoolMitra Transport SafeGuard</Text>
            <Text style={styles.safetyFooterSub}>
              Bus speed & schedule are monitored live. For any delay inquiries, call the school transport coordinator directly at +91 11 4567 8900.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 52 : 38,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  childHeaderSub: { fontSize: 11, color: '#64748b', fontWeight: '700', marginTop: 1 },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  voiceBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  liveStreamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  liveStreamDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },
  liveStreamText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#ef4444',
    letterSpacing: 0.5,
  },
  refreshIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { 
    padding: 14, 
    paddingBottom: 90 
  },

  // Shift Selector Tab
  shiftSelectorCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  shiftTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 9,
    borderRadius: 10,
  },
  shiftTabBtnActive: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  shiftTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  shiftTabTextActive: {
    color: '#1d4ed8',
    fontWeight: '900',
  },

  // Quick Schedule & Punctuality Strip (Always visible above map)
  quickScheduleStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  quickScheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  quickScheduleLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '700',
  },
  quickScheduleValue: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#0f172a',
  },
  quickScheduleDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#cbd5e1',
  },
  quickStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  quickStatusOnTime: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  quickStatusDelayed: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  miniDotPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  quickStatusText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  // Map Card
  mapContainerCard: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    marginBottom: 12,
    elevation: 6,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  // Exact Location Card
  exactLocationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#bfdbfe',
    elevation: 3,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    gap: 12,
  },
  exactPinBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#93c5fd',
    position: 'relative',
    marginTop: 2,
  },
  exactRadarPulse: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
  },
  exactLocHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  exactLocLabel: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#2563eb',
    letterSpacing: 0.5,
  },
  gpsFixBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gpsFixText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803d',
  },
  exactLocationNameText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 2,
  },
  exactCoordsSubText: {
    fontSize: 10.5,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },

  // Punctuality & Schedule Card
  punctualityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#bbf7d0',
    elevation: 3,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  punctualityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 10,
    marginBottom: 12,
  },
  punctualityIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  punctualityTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  punctualitySub: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 1,
  },
  onTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  delayedBadge: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  onTimeBadgeText: {
    fontSize: 10.5,
    fontWeight: '900',
    color: '#15803d',
  },
  scheduleComparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  scheduleBox: {
    flex: 1,
    alignItems: 'center',
  },
  scheduleBoxLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  scheduleBoxValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  scheduleBoxFootnote: {
    fontSize: 9,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  scheduleDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#cbd5e1',
  },
  trafficAlertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  trafficAlertText: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '700',
    flex: 1,
  },
  trafficAlertRowDelayed: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  delaySimulationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  delaySimulationLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  simDelayBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  simDelayBtnActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  simDelayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
  },
  simDelayTextActive: {
    color: '#1d4ed8',
    fontWeight: '900',
  },

  // Smart Child Attendance / Boarding Card
  childBoardingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardOnBoard: {
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
  },
  cardArrived: {
    borderColor: '#c084fc',
    backgroundColor: '#faf5ff',
  },
  childCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  childAvatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  studentNameStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  studentNameText: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#0f172a',
  },
  boardingPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pillWaiting: { backgroundColor: '#fef3c7' },
  pillBoarding: { backgroundColor: '#fed7aa' },
  pillOnBoard: { backgroundColor: '#dcfce7' },
  pillArrived: { backgroundColor: '#ede9fe' },
  boardingPillText: { fontSize: 10.5, fontWeight: '900' },
  textWaiting: { color: '#b45309' },
  textBoarding: { color: '#c2410c' },
  textOnBoard: { color: '#15803d' },
  textArrived: { color: '#6b21a8' },
  boardingSubText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },

  // Ola/Uber Ride Status Card
  olaRideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  rideStatusStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  pulseGreenBeacon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerGreenBeacon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  rideStatusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    flex: 1,
    marginLeft: 8,
  },
  speedCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  speedCapsuleText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1d4ed8',
  },

  // Hero ETA Section
  etaHeroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 16,
    marginBottom: 14,
  },
  etaLeftColumn: { flex: 1 },
  etaLabelText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  etaBigNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: 2,
  },
  etaBigMinutes: {
    fontSize: 38,
    fontWeight: '900',
    color: '#2563eb',
    lineHeight: 44,
  },
  etaBigUnit: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1d4ed8',
  },
  countdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ffedd5',
  },
  countdownPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#c2410c',
  },
  etaDividerVertical: {
    width: 1,
    height: 60,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 14,
  },
  etaRightColumn: { flex: 1.3 },
  nextStopSmallLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  nextStopBigName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 2,
    marginBottom: 6,
  },
  distanceMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  distanceValueText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#15803d',
  },

  // Checkpoint Progress Bar
  progressContainer: { marginBottom: 16 },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkpointLabelItem: {
    alignItems: 'center',
    gap: 3,
  },
  checkpointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
  },
  checkpointDotActive: {
    backgroundColor: '#2563eb',
  },
  checkpointText: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },
  checkpointTextHighlight: {
    color: '#16a34a',
    fontWeight: '900',
  },

  // Metrics 4-Grid (Responsive 2x2 on mobile)
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  metricCard: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  metricSubLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.3,
    marginBottom: 2,
    textAlign: 'center',
  },
  metricValueLarge: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
  },
  metricUnitSmall: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748b',
  },
  metricFootnote: {
    fontSize: 8.5,
    color: '#16a34a',
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },

  // Driver Drawer Card
  driverDrawerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  driverLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  driverAvatarBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#c7d2fe',
  },
  driverAvatarInitial: { fontSize: 22 },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverNameText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  ratingBadge: {
    backgroundColor: '#fef08a',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#854d0e',
  },
  busPlateText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '700',
    marginTop: 1,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  verificationText: {
    fontSize: 9.5,
    color: '#16a34a',
    fontWeight: '700',
  },
  actionButtonsCol: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 6,
  },
  callDriverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 5,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  callDriverBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ffffff',
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1.5,
    borderColor: '#fecaca',
  },
  sosButtonText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ef4444',
  },

  // Surveillance Bar
  safetySurveillanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  safetyText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  safetyDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#cbd5e1',
  },

  // Stops Timeline
  timelineSectionHeader: {
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
  },
  sectionHeaderSub: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 1,
  },
  stopsTimelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  timelineItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderRadius: 12,
  },
  timelineItemRowActive: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
  },
  timelineLineCol: {
    alignItems: 'center',
    width: 28,
    marginRight: 10,
  },
  stopPinCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    zIndex: 2,
  },
  stopPinCompleted: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  stopPinNext: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  stopPinUpcoming: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
  },
  stopPinPickupHighlight: {
    borderColor: '#16a34a',
    borderWidth: 2.5,
  },
  innerMiniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
  },
  verticalConnectingLine: {
    width: 2,
    height: 48,
    backgroundColor: '#e2e8f0',
    marginTop: 2,
  },
  connectingLineCompleted: {
    backgroundColor: '#16a34a',
  },
  stopInfoCol: { flex: 1 },
  stopHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  stopTitleFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    flex: 1,
  },
  stopMainName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0f172a',
  },
  stopMainNameActive: {
    color: '#2563eb',
    fontWeight: '900',
  },
  stopMainNamePickup: {
    color: '#15803d',
  },
  childPickupBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  childPickupBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#15803d',
  },
  stopTimingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  timingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 3,
  },
  timingChipPunctuality: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  timingChipLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748b',
  },
  timingChipValue: {
    fontSize: 10.5,
    fontWeight: '900',
    color: '#0f172a',
  },
  stopStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pillCompleted: { backgroundColor: '#dcfce7' },
  pillNext: { backgroundColor: '#dbeafe' },
  pillUpcoming: { backgroundColor: '#f1f5f9' },
  stopStatusPillText: { fontSize: 10, fontWeight: '800' },
  pillTextCompleted: { color: '#15803d' },
  pillTextNext: { color: '#1d4ed8' },
  pillTextUpcoming: { color: '#64748b' },

  // Safety Footer
  safetyFooterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  safetyFooterTitle: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#0f172a',
  },
  safetyFooterSub: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 2,
    lineHeight: 15,
  },
});
