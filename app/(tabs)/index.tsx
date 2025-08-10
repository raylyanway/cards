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
  const cards = useBoundStore((state) => state.cards);
  const setCards = useBoundStore((state) => state.setCards);
  const getCardsInfo = useBoundStore((state) => state.getCardsInfo);
  const words = useBoundStore((state) => state.words);
  // const showAllTableData = useBoundStore((state) => state.showAllTableData);
  // const showKVStore = useBoundStore((state) => state.showKVStore);
  const removeKVStore = useBoundStore((state) => state.removeKVStore);
  const totalCards = Object.keys(words).length;
  const { cardIdsToLearn, cardIdsToRepeat } = getCardsInfo();
  const buttonName =
    cardIdsToRepeat.length > 0
      ? 'repeat'
      : cardIdsToLearn.length > 0
        ? 'learn'
        : 'completed';
  const isButtonDisabled = buttonName === 'completed'

  // logAllStorage(); // Log all storage for debugging
  // clearAllStorage(); // Clear storage for testing purposes
  // testDatabase();
  // showAllTableData();
  // showKVStore();
  removeKVStore();

  const handleLearnPress = () => {
    setCards();
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
          <BlockButton disabled={isButtonDisabled} onPress={handleLearnPress}>
            {buttonName}
          </BlockButton>
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
