import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { Maximize2, Minimize2 } from 'lucide-react-native';
import { MORNING_ROUTE_COORDS, AFTERNOON_ROUTE_COORDS } from '../constants/routesData';

interface MapCoordinate {
  latitude: number;
  longitude: number;
}

interface MapStop {
  name: string;
  time?: string;
  scheduledTime?: string;
  expectedTime?: string;
  delayText?: string;
  delayStatus?: string;
  status?: string;
  completed?: boolean;
  latitude: number;
  longitude: number;
  isPickup?: boolean;
  isSchool?: boolean;
}

interface UniversalMapViewProps {
  shift?: 'MORNING' | 'AFTERNOON';
  busLocation?: MapCoordinate & { heading?: number; speed?: number };
  schoolLocation?: MapCoordinate & { name?: string };
  pickupLocation?: MapCoordinate & { name?: string };
  routeStops?: MapStop[];
  mapConfig?: {
    provider?: string;
    accessToken?: string;
    googleMapsApiKey?: string;
    tileLayer?: string;
  } | null;
  height?: number;
  allowExpand?: boolean;
  onTelemetryUpdate?: (data: {
    speed: number;
    heading: number;
    latitude: number;
    longitude: number;
    exactLocationName: string;
    nextStop: string;
    etaMinutes: number;
    distanceLeftMeters: number;
    distanceLeftText: string;
    progressPercent: number;
    currentStopIndex: number;
    statusText: string;
    studentStatus: 'WAITING' | 'BOARDING' | 'ON_BOARD' | 'ARRIVED';
    tripCompleted: boolean;
  }) => void;
}

export default function UniversalMapView({
  shift = 'MORNING',
  schoolLocation = { latitude: 28.5901, longitude: 77.0700, name: 'Delhi Public School Campus' },
  pickupLocation = { latitude: 28.5705, longitude: 77.0632, name: 'Main Market (Pickup)' },
  routeStops = [],
  mapConfig,
  height = 380,
  allowExpand = true,
  onTelemetryUpdate,
}: UniversalMapViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const mapboxToken = mapConfig?.accessToken || process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

  const isMorning = shift === 'MORNING';
  const activeRouteCoords = isMorning ? MORNING_ROUTE_COORDS : AFTERNOON_ROUTE_COORDS;

  const defaultMorningStops = [
    { name: 'Sector 21 Metro Terminal', time: '07:15 AM', scheduledTime: '07:15 AM', expectedTime: '07:16 AM', delayText: 'Departed (+1m)', delayStatus: 'ON_TIME', latitude: 28.5518, longitude: 77.0583 },
    { name: 'Main Market (Pickup)', time: '07:35 AM', scheduledTime: '07:35 AM', expectedTime: '07:34 AM', delayText: 'On Time 🟢 (-1m early)', delayStatus: 'ON_TIME', latitude: 28.5705, longitude: 77.0632, isPickup: true },
    { name: 'Maple Park', time: '07:48 AM', scheduledTime: '07:48 AM', expectedTime: '07:47 AM', delayText: 'On Time 🟢', delayStatus: 'ON_TIME', latitude: 28.5833, longitude: 77.0667 },
    { name: 'Sector 52', time: '08:00 AM', scheduledTime: '08:00 AM', expectedTime: '08:00 AM', delayText: 'On Schedule 🟢', delayStatus: 'ON_TIME', latitude: 28.5880, longitude: 77.0674 },
    { name: 'DPS Campus (School)', time: '08:15 AM', scheduledTime: '08:15 AM', expectedTime: '08:14 AM', delayText: 'On Time 🟢', delayStatus: 'ON_TIME', latitude: 28.5901, longitude: 77.0700, isSchool: true },
  ];

  const defaultAfternoonStops = [
    { name: 'DPS Campus (School)', time: '02:15 PM', scheduledTime: '02:15 PM', expectedTime: '02:15 PM', delayText: 'Departed On Time', delayStatus: 'ON_TIME', latitude: 28.5901, longitude: 77.0700, isSchool: true },
    { name: 'Sector 52', time: '02:28 PM', scheduledTime: '02:28 PM', expectedTime: '02:27 PM', delayText: 'On Time 🟢', delayStatus: 'ON_TIME', latitude: 28.5880, longitude: 77.0674 },
    { name: 'Maple Park', time: '02:42 PM', scheduledTime: '02:42 PM', expectedTime: '02:42 PM', delayText: 'On Schedule 🟢', delayStatus: 'ON_TIME', latitude: 28.5833, longitude: 77.0667 },
    { name: 'Main Market (Drop)', time: '02:55 PM', scheduledTime: '02:55 PM', expectedTime: '02:54 PM', delayText: 'On Time 🟢 (-1m early)', delayStatus: 'ON_TIME', latitude: 28.5705, longitude: 77.0632, isPickup: true },
    { name: 'Sector 21 Metro Terminal', time: '03:15 PM', scheduledTime: '03:15 PM', expectedTime: '03:14 PM', delayText: 'On Time 🟢', delayStatus: 'ON_TIME', latitude: 28.5518, longitude: 77.0583 },
  ];

  const stopsData = routeStops.length > 0 ? routeStops : (isMorning ? defaultMorningStops : defaultAfternoonStops);

  // Listen to Web iframe postMessage
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handleWebMessage = (event: MessageEvent) => {
      try {
        let data = event.data;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {
            return;
          }
        }
        if (data && data.type === 'BUS_TELEMETRY' && onTelemetryUpdate) {
          onTelemetryUpdate(data);
        }
      } catch (err) {}
    };

    window.addEventListener('message', handleWebMessage);
    return () => window.removeEventListener('message', handleWebMessage);
  }, [onTelemetryUpdate]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <title>Production Grade Live Bus Tracking</title>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
      <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@turf/turf@6.5.0/turf.min.js"></script>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #map {
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: #0f172a;
          touch-action: pan-x pan-y pinch-zoom;
        }

        /* Flat-on-Road Production Grade 3D Bus Marker */
        .bus-marker-container {
          position: relative;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .radar-pulse-ring {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.35);
          animation: pulseAnimation 2s infinite ease-out;
          pointer-events: none;
        }
        @keyframes pulseAnimation {
          0% { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .bus-svg-wrapper {
          width: 32px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
        }

        /* Ultra-Slim, Minimalist Arriving HUD Banner */
        .uber-eta-banner {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 60px;
          z-index: 100;
          background: rgba(15, 23, 42, 0.90);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 5px 9px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          pointer-events: none;
          gap: 6px;
        }
        .eta-banner-left {
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1;
          overflow: hidden;
        }
        .live-dot-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: blinkDot 1s infinite alternate;
          flex-shrink: 0;
        }
        @keyframes blinkDot { from { opacity: 0.3; } to { opacity: 1; } }

        .eta-time-title {
          font-size: 11.5px;
          font-weight: 800;
          color: #38bdf8;
          white-space: nowrap;
        }
        .punctuality-tag {
          font-size: 8.5px;
          font-weight: 800;
          padding: 1px 4.5px;
          border-radius: 4px;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }
        .punctuality-tag.on-time {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid #22c55e;
          color: #4ade80;
        }
        .punctuality-tag.delayed {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #f87171;
        }

        .eta-sub-info {
          font-size: 10px;
          color: #cbd5e1;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .speed-badge-pill {
          background: rgba(56, 189, 248, 0.16);
          border: 1px solid #38bdf8;
          color: #38bdf8;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 9.5px;
          font-weight: 800;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Stop Markers */
        .school-pin {
          background: #7c3aed;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid white;
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.6);
          font-size: 16px;
          cursor: pointer;
        }
        .pickup-pin {
          background: #16a34a;
          color: white;
          width: 34px;
          height: 34px;
          border-radius: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid white;
          box-shadow: 0 6px 18px rgba(22, 163, 74, 0.6);
          font-size: 17px;
          cursor: pointer;
          animation: bouncePin 1.5s infinite;
        }
        @keyframes bouncePin {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .stop-dot {
          background: #ffffff;
          border: 3.5px solid #2563eb;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
        }

        /* Floating Touch Controls */
        .map-controls-column {
          position: absolute;
          right: 14px;
          bottom: 14px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .map-ctrl-btn {
          width: 42px;
          height: 42px;
          border-radius: 21px;
          background: #ffffff;
          border: none;
          color: #0f172a;
          font-size: 17px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          user-select: none;
          transition: transform 0.15s, background 0.15s;
        }
        .map-ctrl-btn:active {
          transform: scale(0.92);
          background: #e2e8f0;
        }
        .btn-3d-active {
          background: #1e1b4b;
          color: #facc15;
          font-size: 11.5px;
          font-weight: 900;
          border: 2px solid #facc15;
        }
        .btn-follow-active {
          background: #2563eb;
          color: #ffffff;
        }

        /* Trip Complete Banner */
        .trip-complete-banner {
          display: none;
          position: absolute;
          top: 70px;
          left: 14px;
          right: 14px;
          z-index: 120;
          background: rgba(22, 101, 52, 0.95);
          backdrop-filter: blur(14px);
          border-radius: 16px;
          padding: 14px;
          border: 2px solid #4ade80;
          color: #ffffff;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: slideDown 0.4s ease;
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .trip-complete-title {
          font-size: 16px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .trip-complete-sub {
          font-size: 12px;
          color: #dcfce7;
          margin-bottom: 10px;
        }
        .replay-btn {
          background: #ffffff;
          color: #166534;
          font-weight: 900;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
      </style>
    </head>
    <body>
      <div class="uber-eta-banner">
        <div class="eta-banner-left">
          <div class="live-dot-green"></div>
          <span class="eta-time-title" id="etaTimeDisplay">~3 mins</span>
          <span class="punctuality-tag on-time" id="bannerPunctualityTag">ON TIME</span>
          <span class="eta-sub-info" id="etaSubText">• Next: Main Market (850m)</span>
        </div>
        <div class="speed-badge-pill" id="speedDisplay">
          32 km/h
        </div>
      </div>

      <div class="trip-complete-banner" id="tripCompleteBanner">
        <div class="trip-complete-title" id="completeTitle">🏁 Destination Reached!</div>
        <div class="trip-complete-sub" id="completeSub">Route completed safely. All students deboarded.</div>
        <button class="replay-btn" id="btnReplayTrip">↺ Replay Route</button>
      </div>

      <div class="map-controls-column">
        <button class="map-ctrl-btn btn-3d-active" id="btn3D" title="3D / 2D View">3D</button>
        <button class="map-ctrl-btn" id="btnZoomIn" title="Zoom In">+</button>
        <button class="map-ctrl-btn" id="btnZoomOut" title="Zoom Out">−</button>
        <button class="map-ctrl-btn btn-follow-active" id="btnRecenter" title="Lock on Bus">🎯</button>
        <button class="map-ctrl-btn" id="btnPickup" title="Focus Pickup Stop">📍</button>
      </div>

      <div id="map"></div>

      <script>
        var isMorning = ${isMorning};
        var roadCoords = ${JSON.stringify(activeRouteCoords)};
        var stops = ${JSON.stringify(stopsData)};

        function emitTelemetry(payload) {
          try {
            var msg = JSON.stringify(Object.assign({ type: 'BUS_TELEMETRY' }, payload));
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
              window.ReactNativeWebView.postMessage(msg);
            }
            if (window.parent && window.parent.postMessage) {
              window.parent.postMessage(msg, '*');
            }
          } catch(e) {}
        }

        try {
          mapboxgl.accessToken = '${mapboxToken}';

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: roadCoords[0],
            zoom: 15.8,
            pitch: 52,
            bearing: -5,
            antialias: true
          });

          map.touchZoomRotate.enable();
          map.dragPan.enable();
          map.scrollZoom.enable();

          var is3D = true;
          var followCam = true;
          var busMarker = null;

          function setupMapAndVehicle() {
            // 3D Extrusion
            try {
              var layers = map.getStyle().layers;
              var labelLayerId;
              for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout && layers[i].layout['text-field']) {
                  labelLayerId = layers[i].id;
                  break;
                }
              }
              if (labelLayerId && !map.getLayer('3d-buildings')) {
                map.addLayer({
                  'id': '3d-buildings',
                  'source': 'composite',
                  'source-layer': 'building',
                  'filter': ['==', 'extrude', 'true'],
                  'type': 'fill-extrusion',
                  'minzoom': 13,
                  'paint': {
                    'fill-extrusion-color': '#e2e8f0',
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-base': ['get', 'min_height'],
                    'fill-extrusion-opacity': 0.6
                  }
                }, labelLayerId);
              }
            } catch(eB) {}

            // Road Polyline
            if (!map.getSource('road-route')) {
              map.addSource('road-route', {
                'type': 'geojson',
                'data': {
                  'type': 'Feature',
                  'properties': {},
                  'geometry': {
                    'type': 'LineString',
                    'coordinates': roadCoords
                  }
                }
              });

              map.addLayer({
                'id': 'road-shadow',
                'type': 'line',
                'source': 'road-route',
                'layout': { 'line-join': 'round', 'line-cap': 'round' },
                'paint': {
                  'line-color': '#1d4ed8',
                  'line-width': 10,
                  'line-opacity': 0.35,
                  'line-blur': 4
                }
              });

              map.addLayer({
                'id': 'road-line',
                'type': 'line',
                'source': 'road-route',
                'layout': { 'line-join': 'round', 'line-cap': 'round' },
                'paint': {
                  'line-color': '#2563eb',
                  'line-width': 5.5,
                  'line-opacity': 0.95
                }
              });
            }

            // Stop Pins with Schedule & Delay Details
            stops.forEach(function(s) {
              var el = document.createElement('div');
              if (s.isSchool) {
                el.className = 'school-pin';
                el.innerHTML = '🏫';
              } else if (s.isPickup) {
                el.className = 'pickup-pin';
                el.innerHTML = '📍';
              } else {
                el.className = 'stop-dot';
              }

              var sched = s.scheduledTime || s.time || '--';
              var exp = s.expectedTime || s.time || '--';
              var del = s.delayText || 'On Time 🟢';
              var isPickup = s.isPickup;
              var isSchool = s.isSchool;

              var roleBadge = isPickup ? '<span style="background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;">⭐ YOUR STOP</span>' :
                              (isSchool ? '<span style="background:#ede9fe;color:#6b21a8;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;">🏫 DPS SCHOOL</span>' : '');

              var popupHtml = '<div style="font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;padding:6px 4px;min-width:190px;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">' +
                  '<b style="font-size:13px;color:#0f172a;line-height:1.2;">' + s.name + '</b>' +
                  roleBadge +
                '</div>' +
                '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 10px;font-size:11.5px;">' +
                  '<div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="color:#64748b;">Scheduled:</span><b style="color:#0f172a;">' + sched + '</b></div>' +
                  '<div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="color:#64748b;">Expected:</span><b style="color:#2563eb;">' + exp + '</b></div>' +
                  '<div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">Punctuality:</span><b style="color:#16a34a;">' + del + '</b></div>' +
                '</div>' +
              '</div>';

              var popup = new mapboxgl.Popup({ offset: 18 })
                .setHTML(popupHtml);

              new mapboxgl.Marker(el)
                .setLngLat([s.longitude, s.latitude])
                .setPopup(popup)
                .addTo(map);
            });

            // Production-Grade Map-Aligned Vehicle Marker
            if (!busMarker) {
              var busNode = document.createElement('div');
              busNode.className = 'bus-marker-container';

              // True top-down school bus with headlights pointing forward (North = 0°)
              busNode.innerHTML = \`
                <div class="radar-pulse-ring"></div>
                <div class="bus-svg-wrapper">
                  <svg width="30" height="52" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="5,8 -2,-20 12,-20 8,8" fill="url(#beamGlow)" opacity="0.45"/>
                    <polygon points="26,8 22,-20 36,-20 29,8" fill="url(#beamGlow)" opacity="0.45"/>
                    <rect x="2" y="4" width="30" height="54" rx="7" fill="rgba(0,0,0,0.3)"/>
                    <rect x="3" y="2" width="28" height="56" rx="6" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
                    <rect x="4" y="1" width="26" height="3" rx="1.5" fill="#1e293b"/>
                    <path d="M5 8 C5 5, 29 5, 29 8 L27 15 L7 15 Z" fill="#0f172a"/>
                    <line x1="12" y1="14" x2="16" y2="10" stroke="#94a3b8" stroke-width="1"/>
                    <line x1="22" y1="14" x2="18" y2="10" stroke="#94a3b8" stroke-width="1"/>
                    <rect x="6" y="17" width="22" height="33" rx="3" fill="#ffffff" opacity="0.9"/>
                    <rect x="9" y="22" width="16" height="2.5" rx="1" fill="#cbd5e1"/>
                    <rect x="9" y="27" width="16" height="2.5" rx="1" fill="#cbd5e1"/>
                    <rect x="9" y="32" width="16" height="2.5" rx="1" fill="#cbd5e1"/>
                    <rect x="9" y="37" width="16" height="2.5" rx="1" fill="#cbd5e1"/>
                    <rect x="9" y="42" width="16" height="2.5" rx="1" fill="#cbd5e1"/>
                    <rect x="7" y="52" width="20" height="3" rx="1" fill="#0f172a"/>
                    <rect x="0" y="8" width="3.5" height="5" rx="1" fill="#1e293b"/>
                    <rect x="30.5" y="8" width="3.5" height="5" rx="1" fill="#1e293b"/>
                    <circle cx="6" cy="3" r="2.2" fill="#fef08a"/>
                    <circle cx="28" cy="3" r="2.2" fill="#fef08a"/>
                    <rect x="4" y="56" width="4.5" height="2" rx="1" fill="#ef4444"/>
                    <rect x="25.5" y="56" width="4.5" height="2" rx="1" fill="#ef4444"/>
                    <defs>
                      <linearGradient id="beamGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#fef08a" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              \`;

              // Crucial: rotationAlignment and pitchAlignment set to 'map' keeps bus locked to tarmac!
              busMarker = new mapboxgl.Marker({
                element: busNode,
                anchor: 'center',
                rotationAlignment: 'map',
                pitchAlignment: 'map'
              }).setLngLat(roadCoords[0]).addTo(map);

              var busPopupHtml = '<div style="font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;padding:6px;min-width:200px;">' +
                '<div style="font-size:13.5px;font-weight:800;color:#0f172a;margin-bottom:2px;">🚌 School Bus #01</div>' +
                '<div style="font-size:11px;color:#64748b;margin-bottom:6px;">Driver: Ram Singh • DL 01 AB 4321</div>' +
                '<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:6px 8px;font-size:11.5px;color:#166534;margin-bottom:6px;">' +
                  '<div style="font-weight:800;margin-bottom:2px;">🟢 STATUS: ON TIME</div>' +
                  '<div style="color:#15803d;font-size:11px;">0 min delay • Smooth traffic flow</div>' +
                '</div>' +
                '<div style="font-size:11px;color:#334155;">' +
                  'Pickup Scheduled: <b>' + (isMorning ? '07:35 AM' : '02:55 PM') + '</b>' +
                '</div>' +
              '</div>';

              var busPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(busPopupHtml);
              busMarker.setPopup(busPopup);
            }

            startContinuousTurfEngine();
          }

          map.on('load', setupMapAndVehicle);
          setTimeout(function() {
            if (!busMarker) {
              try { setupMapAndVehicle(); } catch(e) {}
            }
          }, 1500);

          // ─── CONTINUOUS PARAMETRIC TURF.JS ENGINE ───
          var currentBearing = 45;

          function getShortestAngleDiff(target, current) {
            var diff = (target - current) % 360;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            return diff;
          }

          function lerpAngle(current, target, factor) {
            var diff = getShortestAngleDiff(target, current);
            return (current + diff * factor + 360) % 360;
          }

          var currentDistanceKm = 0;
          var totalRouteKm = 13.5;
          var routeLine = null;
          var lastTime = performance.now();
          var dwellUntil = 0;
          var hasDweltAtPickup = false;
          var isTripDone = false;

          function startContinuousTurfEngine() {
            try {
              routeLine = turf.lineString(roadCoords);
              totalRouteKm = turf.length(routeLine, { units: 'kilometers' });
            } catch(e) {
              console.warn("Turf linestring init:", e);
            }

            var lastTelemetryTime = 0;
            var lastCameraPanTime = 0;

            function frame(now) {
              var dt = Math.min(0.1, (now - lastTime) / 1000);
              lastTime = now;

              // Check dwell time at pickup stop (pause for 5 seconds)
              if (now < dwellUntil) {
                if (now - lastTelemetryTime > 400) {
                  lastTelemetryTime = now;
                  var speedDisp = document.getElementById('speedDisplay');
                  if (speedDisp) speedDisp.innerText = '0 km/h (Stopped)';
                  var etaTitle = document.getElementById('etaTimeDisplay');
                  if (etaTitle) etaTitle.innerText = '🛑 Stopped';
                  var etaSub = document.getElementById('etaSubText');
                  if (etaSub) etaSub.innerText = '• Boarding Student';

                  emitTelemetry({
                    speed: 0,
                    heading: Math.round(currentBearing),
                    latitude: roadCoords[Math.floor(roadCoords.length * 0.35)][1],
                    longitude: roadCoords[Math.floor(roadCoords.length * 0.35)][0],
                    exactLocationName: 'Main Market Bus Bay, Dwarka Sector 22',
                    nextStop: isMorning ? 'Main Market (Pickup Point)' : 'Main Market (Drop Point)',
                    etaMinutes: 0,
                    distanceLeftMeters: 0,
                    distanceLeftText: '0 m (At Stop)',
                    progressPercent: 35,
                    currentStopIndex: 1,
                    statusText: isMorning ? '🛑 Halting at Main Market • Boarding Aarav' : '🛑 Deboarding Aarav at Main Market',
                    studentStatus: isMorning ? 'BOARDING' : 'ARRIVED',
                    tripCompleted: false
                  });
                }
                requestAnimationFrame(frame);
                return;
              }

              if (isTripDone) {
                requestAnimationFrame(frame);
                return;
              }

              // Realistic driving speed: ~35 km/h -> 0.0097 km/s
              var kmPerSec = 0.012;
              currentDistanceKm += kmPerSec * dt;

              var progressRatio = Math.min(1.0, currentDistanceKm / totalRouteKm);

              // Dwell at Main Market (around 35% of route) for 5 seconds
              if (!hasDweltAtPickup && progressRatio >= 0.35 && progressRatio < 0.40) {
                hasDweltAtPickup = true;
                dwellUntil = performance.now() + 5000;
                requestAnimationFrame(frame);
                return;
              }

              // Trip Complete
              if (progressRatio >= 1.0) {
                isTripDone = true;
                currentDistanceKm = totalRouteKm;
                var banner = document.getElementById('tripCompleteBanner');
                if (banner) {
                  document.getElementById('completeTitle').innerText = isMorning ? '🏁 Arrived at DPS Campus!' : '🏁 Arrived at Sector 21 Terminal!';
                  document.getElementById('completeSub').innerText = isMorning ? 'Morning route finished. Aarav safely in school.' : 'Afternoon return route finished. Aarav home safe.';
                  banner.style.display = 'block';
                }

                emitTelemetry({
                  speed: 0,
                  heading: Math.round(currentBearing),
                  latitude: roadCoords[roadCoords.length - 1][1],
                  longitude: roadCoords[roadCoords.length - 1][0],
                  exactLocationName: isMorning ? 'Delhi Public School Campus, North Gate' : 'Sector 21 Metro Terminal, Dwarka',
                  nextStop: isMorning ? 'DPS Campus (School)' : 'Sector 21 Metro',
                  etaMinutes: 0,
                  distanceLeftMeters: 0,
                  distanceLeftText: 'Arrived ✅',
                  progressPercent: 100,
                  currentStopIndex: 4,
                  statusText: '🏁 Route Completed Safely',
                  studentStatus: isMorning ? 'ARRIVED' : 'ARRIVED',
                  tripCompleted: true
                });
                return;
              }

              // Calculate current position and lookahead bearing using Turf.js
              if (routeLine) {
                try {
                  var currPt = turf.along(routeLine, currentDistanceKm, { units: 'kilometers' });
                  var aheadPt = turf.along(routeLine, Math.min(totalRouteKm, currentDistanceKm + 0.030), { units: 'kilometers' });
                  var targetBearing = turf.bearing(currPt, aheadPt);

                  // Smoothly steer angle towards target road bearing
                  currentBearing = lerpAngle(currentBearing, targetBearing, 0.08);

                  var coords = currPt.geometry.coordinates;

                  // Update Mapbox Marker
                  if (busMarker) {
                    busMarker.setLngLat(coords);
                    busMarker.setRotation(currentBearing); // Perfectly aligned with road!
                  }

                  // Camera auto-pan
                  if (followCam && now - lastCameraPanTime > 1200) {
                    lastCameraPanTime = now;
                    map.easeTo({
                      center: coords,
                      pitch: is3D ? 54 : 0,
                      duration: 1100
                    });
                  }

                  // Telemetry update every 400ms
                  if (now - lastTelemetryTime > 400) {
                    lastTelemetryTime = now;

                    var speed = Math.round(30 + Math.sin(progressRatio * 10) * 4);
                    var speedDisp = document.getElementById('speedDisplay');
                    if (speedDisp) speedDisp.innerText = speed + ' km/h';

                    var progressPercent = Math.round(progressRatio * 100);
                    var etaMins = Math.max(1, Math.round((1.0 - progressRatio) * (isMorning ? 12 : 14)));
                    var distLeftKm = ((1.0 - progressRatio) * totalRouteKm).toFixed(1);

                    var nextStop = '';
                    var exactLandmark = '';
                    var studentStatus = 'WAITING';

                    if (isMorning) {
                      if (progressRatio < 0.35) {
                        nextStop = 'Main Market (Pickup Point)';
                        exactLandmark = 'Sector 22 Arterial Road, Opp. City Center Mall';
                        studentStatus = 'WAITING';
                      } else if (progressRatio < 0.70) {
                        nextStop = 'Maple Park';
                        exactLandmark = 'Dwarka Expressway Service Road, near Maple Greens';
                        studentStatus = 'ON_BOARD';
                      } else if (progressRatio < 0.90) {
                        nextStop = 'Sector 52';
                        exactLandmark = 'Sector 52 Junction Avenue, approaching School Belt';
                        studentStatus = 'ON_BOARD';
                      } else {
                        nextStop = 'DPS Campus (School)';
                        exactLandmark = 'Delhi Public School Main Road, Gate #2';
                        studentStatus = 'ON_BOARD';
                      }
                    } else {
                      if (progressRatio < 0.30) {
                        nextStop = 'Sector 52';
                        exactLandmark = 'Departed DPS Campus, entering Sector 52';
                        studentStatus = 'ON_BOARD';
                      } else if (progressRatio < 0.60) {
                        nextStop = 'Maple Park';
                        exactLandmark = 'Dwarka Expressway Arterial Corridor';
                        studentStatus = 'ON_BOARD';
                      } else if (progressRatio < 0.75) {
                        nextStop = 'Main Market (Drop Point)';
                        exactLandmark = 'Approaching Main Market Bus Bay (Parent Drop)';
                        studentStatus = 'ON_BOARD';
                      } else {
                        nextStop = 'Sector 21 Metro';
                        exactLandmark = 'Sector 21 Metro Final Terminal Avenue';
                        studentStatus = 'ARRIVED';
                      }
                    }

                    var etaTitle = document.getElementById('etaTimeDisplay');
                    if (etaTitle) etaTitle.innerText = '~' + etaMins + 'm';
                    var etaSub = document.getElementById('etaSubText');
                    if (etaSub) etaSub.innerText = '• ' + nextStop + ' (' + distLeftKm + 'km)';
                    var bannerPunctuality = document.getElementById('bannerPunctualityTag');
                    if (bannerPunctuality) bannerPunctuality.innerHTML = 'ON TIME';

                    emitTelemetry({
                      speed: speed,
                      heading: Math.round(currentBearing),
                      latitude: coords[1],
                      longitude: coords[0],
                      exactLocationName: exactLandmark,
                      nextStop: nextStop,
                      etaMinutes: etaMins,
                      distanceLeftMeters: Math.round((1.0 - progressRatio) * totalRouteKm * 1000),
                      distanceLeftText: distLeftKm + ' km',
                      progressPercent: progressPercent,
                      currentStopIndex: progressRatio < 0.35 ? 1 : (progressRatio < 0.70 ? 2 : (progressRatio < 0.90 ? 3 : 4)),
                      statusText: '🟢 En Route: ' + exactLandmark,
                      studentStatus: studentStatus,
                      tripCompleted: false
                    });
                  }
                } catch(err) {}
              }

              requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
          }

          // UI Buttons
          document.getElementById('btnReplayTrip').onclick = function() {
            currentDistanceKm = 0;
            isTripDone = false;
            hasDweltAtPickup = false;
            dwellUntil = 0;
            document.getElementById('tripCompleteBanner').style.display = 'none';
            map.flyTo({ center: roadCoords[0], zoom: 15.8, pitch: is3D ? 52 : 0, duration: 800 });
            startContinuousTurfEngine();
          };

          document.getElementById('btnZoomIn').onclick = function() { map.zoomIn({ duration: 300 }); };
          document.getElementById('btnZoomOut').onclick = function() { map.zoomOut({ duration: 300 }); };
          document.getElementById('btnRecenter').onclick = function() {
            followCam = true;
            this.classList.add('btn-follow-active');
            if (busMarker) {
              var pos = busMarker.getLngLat();
              map.flyTo({ center: [pos.lng, pos.lat], zoom: 15.8, pitch: is3D ? 52 : 0, duration: 800 });
            }
          };
          document.getElementById('btnPickup').onclick = function() {
            followCam = false;
            document.getElementById('btnRecenter').classList.remove('btn-follow-active');
            map.flyTo({ center: [77.0632, 28.5705], zoom: 16.5, pitch: 45, duration: 900 });
          };
          document.getElementById('btn3D').onclick = function() {
            is3D = !is3D;
            this.innerText = is3D ? '3D' : '2D';
            this.style.background = is3D ? '#1e1b4b' : '#ffffff';
            this.style.color = is3D ? '#facc15' : '#0f172a';
            map.easeTo({ pitch: is3D ? 52 : 0, duration: 500 });
          };

          map.on('dragstart', function() {
            followCam = false;
            document.getElementById('btnRecenter').classList.remove('btn-follow-active');
          });

        } catch (err) {
          console.error("Mapbox init error:", err);
        }
      </script>
    </body>
    </html>
  `;

  const mapHeight = isExpanded ? 550 : height;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height: mapHeight }]}>
        <iframe
          srcDoc={htmlContent}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 22,
          }}
          title="Production Grade Live Bus Map"
        />

        {allowExpand && (
          <TouchableOpacity 
            style={styles.expandFab} 
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.85}
          >
            {isExpanded ? (
              <Minimize2 size={16} color="#ffffff" />
            ) : (
              <Maximize2 size={16} color="#ffffff" />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // On Native (Android / iOS)
  let NativeWebView: any = null;
  try {
    NativeWebView = require('react-native-webview').WebView;
  } catch (e) {
    NativeWebView = null;
  }

  if (NativeWebView) {
    return (
      <View style={[styles.container, { height: mapHeight }]}>
        <NativeWebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
          scrollEnabled={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={false}
          bounces={false}
          overScrollMode="never"
          onMessage={(event: any) => {
            try {
              let data = event.nativeEvent.data;
              if (typeof data === 'string') {
                data = JSON.parse(data);
              }
              if (data && data.type === 'BUS_TELEMETRY' && onTelemetryUpdate) {
                onTelemetryUpdate(data);
              }
            } catch (err) {}
          }}
        />

        {allowExpand && (
          <TouchableOpacity 
            style={styles.expandFab} 
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.85}
          >
            {isExpanded ? (
              <Minimize2 size={16} color="#ffffff" />
            ) : (
              <Maximize2 size={16} color="#ffffff" />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { height: mapHeight }]}>
      <Text style={{ textAlign: 'center', marginTop: 80, color: '#64748b' }}>Live Map Active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  webview: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  expandFab: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    zIndex: 120,
    elevation: 5,
  },
});
