import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { ParallaxScrollView } from '@/components/layouts/ParallaxScrollView';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { cards } from '@/store/cards';
import { logAllStorage } from '@/store/sqlStorage';
import { useGlobalStore } from '@/store/useGlobalStore';
import { words } from '@/store/words';
import { ICardType } from '@/types';

export default function HomeScreen() {
  const learnedCards = useGlobalStore((s) => s.learnedCards);
  const learnedWords = useGlobalStore((s) => s.learnedWords);
  const setCurrentCards = useGlobalStore((s) => s.setCurrentCards);
  const setCurrentCardsType = useGlobalStore((s) => s.setCurrentCardsType);
  const totalCards = cards.length;
  const totalWords = words.length;

  logAllStorage(); // Log all storage for debugging
  // clearAllStorage(); // Clear storage for testing purposes

  const handleLearnPress = (type: ICardType) => () => {
    const items = type === 'word' ? words : cards;
    setCurrentCards(items);
    setCurrentCardsType(type);
  };

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
