import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { ParallaxScrollView } from '@/components/layouts/ParallaxScrollView';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { cards } from '@/store/cards';
import { useBoundStore } from '@/store/useBoundStore';
import { words } from '@/store/words';
import { ICardType } from '@/types';

export default function HomeScreen() {
  // const router = useRouter();
  const learnedCards = useBoundStore((state) => state.learnedCards);
  const learnedWords = useBoundStore((state) => state.learnedWords);
  const showAllTableData = useBoundStore((state) => state.showAllTableData);
  const setCurrentCardsType = useBoundStore(
    (state) => state.setCurrentCardsType
  );
  const totalCards = cards.length;
  const totalWords = words.length;

  // logAllStorage(); // Log all storage for debugging
  // clearAllStorage(); // Clear storage for testing purposes
  // testDatabase();
  showAllTableData();

  const handleLearnPress = (type: ICardType) => () => {
    setCurrentCardsType(type);
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
            Words: {learnedWords.length} / {totalWords}
          </Text>
          <BlockButton onPress={handleLearnPress('word')}>Learn</BlockButton>
        </View>
        <View row spaceBetween>
          <Text>
            Cards: {learnedCards.length} / {totalCards}
          </Text>
          <BlockButton onPress={handleLearnPress('card')}>Learn</BlockButton>
        </View>
        <Text style={{ color: '#888' }}>
          Your progress is saved on this device.
        </Text>
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
