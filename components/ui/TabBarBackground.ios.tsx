import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

import { useBoundStore } from '@/store/useBoundStore';

export default function BlurTabBarBackground() {
  const theme = useBoundStore((state) => state.theme);

  return (
    <BlurView
      // System chrome material ("systemChromeMaterial") automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint={theme}
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
