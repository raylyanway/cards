import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import 'react-native-reanimated';

import { DatabaseInitializer } from '@/components/DatabaseInitializer';
import { Initializer } from '@/components/Initializer';
import { StatusBar } from '@/components/StatusBar';
import { useBoundStore } from '@/store/useBoundStore';

export default function RootLayout() {
  const deleteDb = useBoundStore((state) => state.deleteDb);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const handleDatabaseInit = async () => {
    // TODO: Comment deleting DB
    deleteDb();
  };

  return (
    <SQLiteProvider
      databaseName="storage.db"
      assetSource={{ assetId: require('../assets/storage.db') }}
      onInit={handleDatabaseInit}
    >
      <DatabaseInitializer>
        <Initializer>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="cards" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar />
        </Initializer>
      </DatabaseInitializer>
    </SQLiteProvider>
  );
}
