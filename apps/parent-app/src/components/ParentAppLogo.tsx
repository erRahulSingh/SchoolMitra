import React from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type LogoSizeType = 'mini' | 'small' | 'medium' | 'large' | 'xlarge' | number;

interface ParentAppLogoProps {
  size?: LogoSizeType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  showBorder?: boolean;
}

const logoSource = require('../../assets/parent_app_logo.png');

export default function ParentAppLogo({ 
  size = 'medium', 
  style, 
  imageStyle,
  showBorder = true 
}: ParentAppLogoProps) {
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'mini':
        return 32;
      case 'small':
        return 48;
      case 'medium':
        return 96;
      case 'large':
        return 130;
      case 'xlarge':
        return 170;
      default:
        return 96;
    }
  };

  const dim = getDimension();
  const borderRadius = Math.round(dim * 0.24);

  return (
    <View 
      style={[
        styles.outerContainer, 
        { 
          width: dim, 
          height: dim,
          borderRadius: borderRadius,
          shadowRadius: dim * 0.16,
          elevation: dim > 60 ? 10 : 4,
        }, 
        style
      ]}
    >
      {showBorder && (
        <LinearGradient
          colors={['rgba(255,255,255,0.6)', 'rgba(56,189,248,0.4)', 'rgba(99,102,241,0.2)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.glowBorder, { borderRadius: borderRadius + 2 }]}
        />
      )}
      <Image
        source={logoSource}
        style={[
          styles.logoImage,
          {
            width: dim,
            height: dim,
            borderRadius: borderRadius,
          },
          imageStyle
        ]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    position: 'relative',
    backgroundColor: '#1e1b4b',
  },
  glowBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    zIndex: -1,
  },
  logoImage: {
    overflow: 'hidden',
  },
});
