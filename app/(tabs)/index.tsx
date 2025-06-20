import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ParallaxScrollView } from '@/components/layouts/ParallaxScrollView';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { Text } from '@/components/texts/Text';
import { logAllStorage } from '@/store/storage';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function HomeScreen() {
  const learned = useGlobalStore((s) => s.learnedCards);
  const totalCards = 7; // Update if cards array changes

  logAllStorage(); // Log all storage for debugging

  return (
    <SafeAreaView themed fullScreen>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
          Dashboard
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>
          Cards learned: {learned.length} / {totalCards}
        </Text>
        <Text style={{ color: '#888', marginBottom: 24 }}>
          Your progress is saved on this device.
        </Text>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
});
