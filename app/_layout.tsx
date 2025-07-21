import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import 'react-native-reanimated';

import { DatabaseInitializer } from '@/components/DatabaseInitializer';
import { Initializer } from '@/components/Initializer';
import { StatusBar } from '@/components/StatusBar';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SQLiteProvider
      databaseName="storage.db"
      assetSource={{ assetId: require('../assets/storage.db') }}
    >
      <DatabaseInitializer>
        <Initializer>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar />
        </Initializer>
      </DatabaseInitializer>
    </SQLiteProvider>
  );
}
