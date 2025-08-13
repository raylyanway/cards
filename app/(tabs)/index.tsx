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
  const totalCards = Object.keys(words).length;
  const {
    cardsLearnCount,
    cardsRepeatCount,
    closestReviewTime,
    cardsCompletedCount,
    cardsHoldCount,
    cardsNotCompletedCount
  } = cardsInfo;
  const timeUntilReview = closestReviewTime - Date.now();

  // const removeKVStore = useBoundStore((state) => state.removeKVStore);
  // removeKVStore();

  useEffect(() => {}, [learnedCards]);

  useEffect(() => {
    if (!closestReviewTime) return;

    if (timeUntilReview <= 0) return;

    const timer = setTimeout(() => {
      setCardsInfo();
    }, timeUntilReview);

    return () => clearTimeout(timer);
  }, [closestReviewTime, setCardsInfo, timeUntilReview]);

  const isRepeat = cardsRepeatCount > 0;
  const isLearn = cardsLearnCount > 0;
  const isTimer = timeUntilReview > 0;
  const buttonName = isRepeat
    ? 'repeat'
    : isLearn
      ? 'learn'
      : isTimer
        ? 'hold'
        : 'completed';

  const isButtonDisabled = !(isRepeat || isLearn);

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
            Cards: {cardsHoldCount + cardsRepeatCount} / {totalCards}
          </Text>
          <BlockButton disabled={isButtonDisabled} onPress={handleLearnPress}>
            {buttonName}
          </BlockButton>
        </View>
        <View row spaceBetween>
          <Text>Available in</Text>
          <Timer timestamp={closestReviewTime} />
        </View>
        <Text>Cards to learn: {cardsLearnCount}</Text>
        <Text>Cards to repeat: {cardsRepeatCount}</Text>
        <Text>Cards on hold: {cardsHoldCount}</Text>
        <Text>Completed cards: {cardsCompletedCount}</Text>
        <Text>Not completed cards: {cardsNotCompletedCount}</Text>
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
