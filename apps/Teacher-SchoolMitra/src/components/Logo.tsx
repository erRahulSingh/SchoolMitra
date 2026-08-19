import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Circle, Path, G } from 'react-native-svg';

interface LogoProps {
  size?: number;
  variant?: 'default' | 'white' | 'dark';
}

/**
 * SchoolMitra Teacher App Logo
 * A premium SVG logo with a gradient circle background featuring 
 * a stylized open book with a graduation cap, symbolizing teaching & education.
 */
export default function Logo({ size = 48, variant = 'default' }: LogoProps) {

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Defs>
          {/* Main gradient - Purple to Indigo */}
          <SvgLinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={variant === 'white' ? '#ffffff' : '#7c3aed'} />
            <Stop offset="100%" stopColor={variant === 'white' ? '#f8fafc' : '#4c1d95'} />
          </SvgLinearGradient>
          {/* Shine gradient */}
          <SvgLinearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </SvgLinearGradient>
          {/* Book gradient */}
          <SvgLinearGradient id="bookGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#ffffff" />
            <Stop offset="100%" stopColor="#e2e8f0" />
          </SvgLinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx="24"
          cy="24"
          r="23"
          fill="url(#bgGradient)"
        />

        {/* Subtle shine overlay */}
        <Circle
          cx="24"
          cy="24"
          r="23"
          fill="url(#shineGrad)"
        />

        {/* Outer ring */}
        <Circle
          cx="24"
          cy="24"
          r="23"
          fill="none"
          stroke={variant === 'white' ? '#e2e8f0' : '#a78bfa'}
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        <G>
          {/* Open Book - Left Page */}
          <Path
            d="M24 18 C22 16, 16 15, 12 16 L12 32 C16 31, 22 31, 24 33 Z"
            fill={variant === 'white' ? '#7c3aed' : '#ffffff'}
            opacity="0.95"
          />
          {/* Open Book - Right Page */}
          <Path
            d="M24 18 C26 16, 32 15, 36 16 L36 32 C32 31, 26 31, 24 33 Z"
            fill={variant === 'white' ? '#7c3aed' : '#ffffff'}
            opacity="0.85"
          />
          {/* Book Spine */}
          <Path
            d="M24 18 L24 33"
            stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'}
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Graduation Cap */}
          <Path
            d="M16 14 L24 10 L32 14 L24 18 Z"
            fill={variant === 'white' ? '#7c3aed' : '#fbbf24'}
            opacity="0.95"
          />
          {/* Cap Tassel */}
          <Path
            d="M30 13.5 L30 18 C30 19.5, 32 20, 32.5 18"
            stroke={variant === 'white' ? '#4c1d95' : '#fbbf24'}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tassel Ball */}
          <Circle
            cx="32.5"
            cy="18"
            r="0.8"
            fill={variant === 'white' ? '#4c1d95' : '#fbbf24'}
          />

          {/* Book Lines - Left page */}
          <Path d="M15 21 L22 21.5" stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'} strokeWidth="0.6" strokeOpacity="0.4" strokeLinecap="round" />
          <Path d="M15 24 L21.5 24.5" stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'} strokeWidth="0.6" strokeOpacity="0.3" strokeLinecap="round" />
          <Path d="M15 27 L21 27.5" stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'} strokeWidth="0.6" strokeOpacity="0.25" strokeLinecap="round" />

          {/* Book Lines - Right page */}
          <Path d="M26 21.5 L33 21" stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'} strokeWidth="0.6" strokeOpacity="0.35" strokeLinecap="round" />
          <Path d="M26.5 24.5 L33 24" stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'} strokeWidth="0.6" strokeOpacity="0.25" strokeLinecap="round" />
          <Path d="M27 27.5 L33 27" stroke={variant === 'white' ? '#4c1d95' : '#a78bfa'} strokeWidth="0.6" strokeOpacity="0.2" strokeLinecap="round" />

          {/* Small sparkle/star accent */}
          <Path
            d="M35 11 L35.5 9.5 L36 11 L37.5 11.5 L36 12 L35.5 13.5 L35 12 L33.5 11.5 Z"
            fill={variant === 'white' ? '#7c3aed' : '#fbbf24'}
            opacity="0.7"
          />
          <Path
            d="M13 11 L13.3 10 L13.6 11 L14.6 11.3 L13.6 11.6 L13.3 12.6 L13 11.6 L12 11.3 Z"
            fill={variant === 'white' ? '#7c3aed' : '#fbbf24'}
            opacity="0.5"
          />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
