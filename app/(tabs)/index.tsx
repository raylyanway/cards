import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ParallaxScrollView } from '@/components/layouts/ParallaxScrollView';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { Text } from '@/components/texts/Text';

export default function HomeScreen() {
  return (
    <SafeAreaView themed>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <Text>Home</Text>
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
