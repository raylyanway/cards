import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { ParallaxScrollView } from '@/components/layouts/ParallaxScrollView';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { Timer } from '@/components/Timer';
import { useBoundStore } from '@/store/useBoundStore';

export default function HomeScreen() {
  const learnedCards = useBoundStore((state) => state.learnedCards);
  const setCards = useBoundStore((state) => state.setCards);
  const cardsInfo = useBoundStore((state) => state.cardsInfo);
  const setCardsInfo = useBoundStore((state) => state.setCardsInfo);
  const words = useBoundStore((state) => state.words);
  const removeKVStore = useBoundStore((state) => state.removeKVStore);
  const totalCards = Object.keys(words).length;
  const { cardsLearnCount, cardsRepeatCount, closestReviewTime } = cardsInfo;
  const timeUntilReview = closestReviewTime - Date.now();

  useEffect(() => {}, [learnedCards]);

  useEffect(() => {
    if (!closestReviewTime) return;

    if (timeUntilReview <= 0) return;

    const timer = setTimeout(() => {
      setCardsInfo();
    }, timeUntilReview);

    return () => clearTimeout(timer);
  }, [closestReviewTime, setCardsInfo, timeUntilReview]);

  console.log({ cardsRepeatCount, cardsLearnCount, timeUntilReview });
  const isRepeat = cardsRepeatCount > 0;
  const isLearn = cardsLearnCount > 0;
  const isTimer = timeUntilReview > 0;
  const buttonName = isRepeat ? (
    'repeat'
  ) : isLearn ? (
    'learn'
  ) : isTimer ? (
    <Timer timestamp={closestReviewTime} />
  ) : (
    'completed'
  );

  const isButtonDisabled = !(isRepeat || isLearn);

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
