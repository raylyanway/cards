import formatColor from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { IconButton } from '@/components/buttons/IconButton';
import { Carousel } from '@/components/Carousel';
import { Icon } from '@/components/icons/Icon';
import { BlockList } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { ProgressBar } from '@/components/ProgressBar';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config/typography';
import { useBoundStore } from '@/store/useBoundStore';
import { IBlockListItem, ICard, IContent, ILearnedCard } from '@/types';

// Helper functions
const getTransparentColor = (color: string, alpha = 0.1) =>
  formatColor(color).alpha(alpha).rgb().string();

const filterContent = (content: IContent[], hideExtra: boolean) =>
  content.reduce((acc, item) => {
    if (item.type !== 'list' && item.hide && !hideExtra) return acc;
    acc = [...acc, item];
    return acc;
  }, [] as IContent[]);

const mapListContent = (content: IContent[], hideExtra: boolean) =>
  content.map((item) => {
    if (item.type === 'list' && item.hide && item.list) {
      return {
        ...item,
        list: item.list.map((listItem) => ({
          ...listItem,
          secondaryText: hideExtra ? listItem.secondaryText : undefined
        }))
      };
    }
    return item;
  });

const getUpdatedCard = (
  currentCard: ICard,
  hideExtra: boolean,
  learnedCards: ILearnedCard[]
) => {
  const filtered = filterContent(currentCard.content, hideExtra);
  const mapped = mapListContent(filtered, hideExtra);
  const currentLearnedCard = learnedCards.find(
    ({ id }) => id === currentCard.id
  );

  const meta = currentLearnedCard
    ? [
        ...currentCard.meta,
        `times: ${currentLearnedCard.timesLearned}`,
        `last: ${new Date(currentLearnedCard.lastTimeLearned).toLocaleDateString()}`
      ]
    : currentCard.meta;

  return { ...currentCard, meta, content: mapped };
};

export default function CardsScreen() {
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const updateLearned = useBoundStore((state) => state.updateLearned);
  const currentCardIndex = useBoundStore((state) => state.currentCardIndex);
  const setCurrentCardIndex = useBoundStore(
    (state) => state.setCurrentCardIndex
  );
  const currentLearnedCards = useBoundStore(
    (state) => state.computedCardsLearning.currentLearnedCards
  );
  const learnedCards = useBoundStore((state) => state.learnedCards);
  const currentCards = useBoundStore((state) => state.currentCards);
  const [hideExtra, setHideExtra] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);

  const currentCard = currentCards[currentCardIndex];

  const transparentTextColor = useMemo(
    () => getTransparentColor(colors.text),
    [colors.text]
  );
  const transparentBackgroundColor = useMemo(
    () => getTransparentColor(colors.background),
    [colors.background]
  );

  // Handlers
  const handleNextPress = useCallback(() => {
    Speech.stop();
    setCurrentCardIndex((currentCardIndex + 1) % currentCards.length);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
  }, [currentCards, currentCardIndex, setCurrentCardIndex]);

  const handlePrevPress = useCallback(() => {
    Speech.stop();
    setCurrentCardIndex(
      (currentCardIndex - 1 + currentCards.length) % currentCards.length
    );
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
  }, [currentCards, currentCardIndex, setCurrentCardIndex]);

  const handleSpeakPress = useCallback(async () => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
      return;
    }
    speakCurrentCard(currentCard.content);
  }, [currentCard.content]);

  const handleTranslatePress = useCallback(() => {
    setHideExtra((prev) => !prev);
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
    const currentCard = currentCards[currentCardIndex];
    updateLearned(currentCard.id);
  }, [currentCardIndex, updateLearned, currentCards]);

  const renderCarouselItem = ({
    item,
    index
  }: {
    item: ICard;
    index: number;
  }) => {
    const updatedCard = getUpdatedCard(item, hideExtra, learnedCards);
    return <Card key={index} card={updatedCard} />;
  };

  const handleIndexChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex);
  };

  return (
    <SafeAreaView themed fullScreen tabPadding>
      <Padding fullScreen padding={spaces.md} style={{ gap: spaces.md }}>
        <View row>
          <IconButton name="close" onPress={() => router.back()} />
          <ProgressBar
            total={currentCards.length}
            value={currentLearnedCards.length}
          />
        </View>
        <Text type="defaultSecondary" center>
          Cards: {currentLearnedCards.length} / {currentCards.length}
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
            <Carousel<ICard>
              items={currentCards}
              renderItem={renderCarouselItem}
              currentIndex={currentCardIndex}
              onIndexChange={handleIndexChange}
            />
          </ScrollView>
          {showBottomIndicator && (
            <LinearGradient
              pointerEvents="none"
              colors={[transparentBackgroundColor, transparentTextColor]}
              style={styles.bottomFade}
            />
          )}
        </View>
        <Controls
          onNextPress={handleNextPress}
          onPrevPress={handlePrevPress}
          onSpeakPress={handleSpeakPress}
          onTranslatePress={handleTranslatePress}
        />
      </Padding>
    </SafeAreaView>
  );
}

// Helper: speak card content
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

// Controls component
const Controls = ({
  onNextPress,
  onPrevPress,
  onSpeakPress,
  onTranslatePress
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
  onSpeakPress: () => void;
  onTranslatePress: () => void;
}) => (
  <View style={{ gap: spaces.md }}>
    <View row style={{ justifyContent: 'center' }}>
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
        <Icon name="language" />
      </BlockButton>
    </View>
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
