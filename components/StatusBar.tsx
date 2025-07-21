import { StatusBar as RNStatusBar } from 'expo-status-bar';

import 'react-native-reanimated';

import { useBoundStore } from '@/store/useBoundStore';

export const StatusBar = () => {
  const isLightTheme = useBoundStore(
    (state) => state.computedTheme.isLightTheme
  );
  const statusBarTheme = isLightTheme ? 'dark' : 'light';

  return <RNStatusBar style={statusBarTheme} />;
};
