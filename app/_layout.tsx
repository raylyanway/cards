import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import 'react-native-reanimated';

import { timeIntervals } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const hydrate = useGlobalStore((s) => s.hydrate);
  const refreshLearned = useGlobalStore((s) => s.refreshLearned);
  const isLightTheme = useGlobalStore((s) => s.computed.isLightTheme);
  const statusBarTheme = isLightTheme ? 'dark' : 'light';

  useEffect(() => {
    hydrate(colorScheme);
  }, [colorScheme, hydrate]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshLearned();
    }, timeIntervals[0]);
    return () => clearInterval(interval);
  }, [refreshLearned]);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={statusBarTheme} />
    </>
  );
}
