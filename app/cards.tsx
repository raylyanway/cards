import formatColor from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { default as PagerView } from 'react-native-pager-view';

import { BlockButton } from '@/components/buttons/BlockButton';
import { IconButton } from '@/components/buttons/IconButton';
import { Icon } from '@/components/icons/Icon';
import { BlockList } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { ProgressBar } from '@/components/ProgressBar';
import { ISwipeProps, Swipe } from '@/components/Swipe';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config/typography';
import { useBoundStore } from '@/store/useBoundStore';
import { IBlockListItem, ICard, IContent } from '@/types';

// Helper functions
const getTransparentColor = (color: string, alpha = 0.1) =>
  formatColor(color).alpha(alpha).rgb().string();

const filterContent = (content: IContent[], showExtra: boolean) =>
  content.reduce((acc, item) => {
    if (item.type !== 'list' && item.hide && !showExtra) return acc;
    acc = [...acc, item];
    return acc;
  }, [] as IContent[]);

const mapListContent = (content: IContent[], showExtra: boolean) =>
  content.map((item) => {
    if (item.type === 'list' && item.hide && item.list) {
      return {
        ...item,
        list: item.list.map((listItem) => ({
          ...listItem,
          secondaryText: showExtra ? listItem.secondaryText : undefined
        }))
      };
    }
    return item;
  });

const getUpdatedCard = (currentCard: ICard, showExtra: boolean) => {
  const filtered = filterContent(currentCard.content, showExtra);
  const mapped = mapListContent(filtered, showExtra);

  return { ...currentCard, content: mapped };
};

export default function CardsScreen() {
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const updateLearned = useBoundStore((state) => state.updateLearned);
  const learnedCards = useBoundStore((state) => state.learnedCards);
  const words = useBoundStore((state) => state.words);
  const cards = useBoundStore((state) => state.cards);
  const setCards = useBoundStore((state) => state.setCards);

  const [cardIndex, setCardIndex] = useState(0);
  const [showExtra, setShowExtra] = useState(true);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);

  const currentCard = cards[cardIndex] || {};
  const totalCards = Object.keys(words).length;
  const totalLearnedCards = Object.keys(learnedCards).length;

  const pagerRef = useRef<PagerView>(null);

  const transparentTextColor = useMemo(
    () => getTransparentColor(colors.text),
    [colors.text]
  );
  const transparentBackgroundColor = useMemo(
    () => getTransparentColor(colors.background),
    [colors.background]
  );

  const handleNextButtonPress = useCallback(() => {
    Speech.stop();
    const isEleventhCard = cardIndex + 1 >= 10;

    // Renew cards
    if (isEleventhCard) {
      setCards();
      return;
    }

    const newCardIndex = (cardIndex + 1) % cards.length;
    pagerRef.current?.setPage(newCardIndex);
    setCardIndex(newCardIndex);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
    updateLearned(cards[newCardIndex].id);
  }, [cards, cardIndex, setCards, updateLearned]);

  const handlePrevButtonPress = useCallback(() => {
    Speech.stop();
    const isFirstCard = cardIndex === 0;

    if (isFirstCard) return;

    const newCardIndex = (cardIndex - 1 + cards.length) % cards.length;
    pagerRef.current?.setPage(newCardIndex);
    setCardIndex(newCardIndex);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
    updateLearned(cards[newCardIndex].id);
  }, [cards, cardIndex, updateLearned]);

  const handleSpeakButtonPress = useCallback(async () => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
      return;
    }
    speakCurrentCard(currentCard.content);
  }, [currentCard.content]);

  const handleEyeButtonPress = useCallback(() => {
    setShowExtra((prev) => !prev);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
  }, []);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const visibleHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;
    setShowTopIndicator(scrollY > 2); // 2px tolerance
    setShowBottomIndicator(scrollY + visibleHeight < contentHeight - 2);
  }, []);

  useEffect(() => {
    handleSpeakButtonPress();
  }, [handleSpeakButtonPress]);

  const renderCarouselItem = ({
    item,
    index
  }: {
    item: ICard;
    index: number;
  }) => {
    const updatedCard = getUpdatedCard(item, showExtra);
    return <Card key={index} card={updatedCard} />;
  };

  const handleIndexChange = useCallback(
    (newCardIndex: number, position: 'left' | 'right') => {
      console.log(11, newCardIndex);
      const isEleventhCard = newCardIndex >= 9;

      // Renew cards
      if (isEleventhCard && position === 'right') {
        setCards();
        return;
      }

      setCardIndex(newCardIndex);
      updateLearned(cards[newCardIndex].id);
    },
    [cards, updateLearned, setCards]
  );

  const handleGetEnabled = (
    swipeDirection: Parameters<ISwipeProps['onEnd']>[0]['swipeDirection']
  ) => !(swipeDirection === 'right' && cardIndex === 0);

  const handleSwipeEnd = ({
    swipeDirection
  }: Parameters<ISwipeProps['onEnd']>[0]) => {
    if (swipeDirection === 'right') handlePrevButtonPress();
    else handleNextButtonPress();
  };

  const hasCards = cards.length > 0;

  return (
    <SafeAreaView themed fullScreen tabPadding>
      <Padding fullScreen padding={spaces.md} style={{ gap: spaces.md }}>
        <View row>
          <IconButton name="close" onPress={() => router.back()} />
          <ProgressBar total={totalCards} value={totalLearnedCards} />
        </View>
        <Text type="defaultSecondary" center>
          Cards: {totalLearnedCards} / {totalCards}
        </Text>
        <View style={styles.flexRelative}>
          {showTopIndicator && (
            <LinearGradient
              pointerEvents="none"
              colors={[transparentTextColor, transparentBackgroundColor]}
              style={styles.topFade}
            />
          )}
          <ScrollView
            fullScreen
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {!hasCards && (
              <Text type="defaultSecondary" center>
                Everything is already learned
              </Text>
            )}
            <Swipe getEnabled={handleGetEnabled} onEnd={handleSwipeEnd}>
              {renderCarouselItem({ item: currentCard, index: cardIndex })}
            </Swipe>
            {/* {hasCards && (
              <Carousel
                ref={pagerRef}
                items={cards}
                initialPage={cardIndex}
                renderItem={renderCarouselItem}
                onIndexChange={handleIndexChange}
              />
            )} */}
          </ScrollView>
          {showBottomIndicator && (
            <LinearGradient
              pointerEvents="none"
              colors={[transparentBackgroundColor, transparentTextColor]}
              style={styles.bottomFade}
            />
          )}
        </View>
        {hasCards && (
          <Controls
            showExtra={showExtra}
            onNextPress={handleNextButtonPress}
            onPrevPress={handlePrevButtonPress}
            onSpeakPress={handleSpeakButtonPress}
            onTranslatePress={handleEyeButtonPress}
          />
        )}
      </Padding>
    </SafeAreaView>
  );
}

function speakCurrentCard(content: IContent[]) {
  content.forEach((item) => {
    if (!item.speak) return;
    if (item.text) {
      Speech.speak(item.text);
    }
    if (item.type === 'list' && item.list) {
      item.list.forEach((listItem) => {
        if (listItem.text) {
          Speech.speak(listItem.text);
        }
      });
    }
  });
}

const Controls = ({
  showExtra,
  onNextPress,
  onPrevPress,
  onSpeakPress,
  onTranslatePress
}: {
  showExtra: boolean;
  onNextPress: () => void;
  onPrevPress: () => void;
  onSpeakPress: () => void;
  onTranslatePress: () => void;
}) => (
  <View row style={{ justifyContent: 'center', marginBottom: 50 }}>
    <BlockButton onPress={onPrevPress} accessibilityLabel="Previous card">
      prev
    </BlockButton>
    <BlockButton onPress={onNextPress} accessibilityLabel="Next card">
      next
    </BlockButton>
    <BlockButton onPress={onSpeakPress} accessibilityLabel="Speak card">
      <Icon name="volume-medium" />
    </BlockButton>
    <BlockButton
      onPress={onTranslatePress}
      accessibilityLabel="Show translation"
    >
      <Icon name={showExtra ? 'eye' : 'eye-off'} />
    </BlockButton>
  </View>
);

const Card = ({ card }: { card: ICard }) => {
  const handleListItemPress = useCallback((item: IBlockListItem) => {
    if (item.icon === 'volume-medium') {
      Speech.speak(item.text);
    }
  }, []);

  return (
    <Center style={{ gap: spaces.xs }}>
      {card.content.map((content, idx) => {
        const { text, type, list } = content;

        if (type === 'list')
          return (
            <BlockList
              center
              key={idx}
              list={list ?? []}
              onItemPress={handleListItemPress}
            />
          );

        return <HighlightedText key={idx} center type={type} text={text} />;
      })}
    </Center>
  );
};

const styles = StyleSheet.create({
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 18,
    zIndex: 10
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 18,
    zIndex: 10
  },
  flexRelative: {
    flex: 1,
    position: 'relative'
  }
});
