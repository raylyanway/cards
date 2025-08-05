import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { ParallaxScrollView } from '@/components/layouts/ParallaxScrollView';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { useBoundStore } from '@/store/useBoundStore';

export default function HomeScreen() {
  const learnedCards = useBoundStore((state) => state.learnedCards);
  const addCards = useBoundStore((state) => state.addCards);
  const words = useBoundStore((state) => state.words);
  // const showAllTableData = useBoundStore((state) => state.showAllTableData);
  // const showKVStore = useBoundStore((state) => state.showKVStore);
  const totalCards = Object.keys(words).length;

  // logAllStorage(); // Log all storage for debugging
  // clearAllStorage(); // Clear storage for testing purposes
  // testDatabase();
  // showAllTableData();
  // showKVStore();

  const handleLearnPress = () => {
    addCards();
    router.push('/cards');
  };

  return (
    <TabSafeAreaView themed fullScreen>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <View row spaceBetween>
          <Text>
            Cards: {Object.keys(learnedCards).length} / {totalCards}
          </Text>
          <BlockButton onPress={handleLearnPress}>Learn</BlockButton>
        </View>
      </ParallaxScrollView>
    </TabSafeAreaView>
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
