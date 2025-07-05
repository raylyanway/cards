import formatColor from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { Icon } from '@/components/icons/Icon';
import { BlockList } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config/typography';
import { useGlobalStore } from '@/store/useGlobalStore';
import { IBlockListItem, ICard, IContent } from '@/types';

// Helper functions
const getTransparentColor = (color: string, alpha = 0.1) =>
  formatColor(color).alpha(alpha).rgb().string();

const filterContent = (content: IContent[], hide: boolean) =>
  content.reduce((acc, item) => {
    if (item.type !== 'list' && item.hide && !hide) return acc;
    acc = [...acc, item];
    return acc;
  }, [] as IContent[]);

const mapListContent = (content: IContent[], hide: boolean) =>
  content.map((item) => {
    if (item.type === 'list' && item.hide && item.list) {
      return {
        ...item,
        list: item.list.map((listItem) => ({
          ...listItem,
          secondaryText: hide ? listItem.secondaryText : undefined
        }))
      };
    }
    return item;
  });

export default function CardsScreen() {
  const colors = useGlobalStore((s) => s.computed.colors);
  const updateLearned = useGlobalStore((s) => s.updateLearned);
  const currentCardIndex = useGlobalStore((s) => s.currentCardIndex);
  const setCurrentCardIndex = useGlobalStore((s) => s.setCurrentCardIndex);
  const learnedCards = useGlobalStore((s) => s.learnedCards);
  const currentCards = useGlobalStore((s) => s.currentCards);
  const [hide, setHide] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);

  const currentCard = currentCards[currentCardIndex];
  console.log('Updated current card:', currentCard);

  const transparentTextColor = useMemo(
    () => getTransparentColor(colors.text),
    [colors.text]
  );
  const transparentBackgroundColor = useMemo(
    () => getTransparentColor(colors.background),
    [colors.background]
  );

  const updatedCurrentCard = useMemo(() => {
    const filtered = filterContent(currentCard.content, hide);
    const mapped = mapListContent(filtered, hide);
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
  }, [currentCard, hide, learnedCards]);

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
    setHide((prev) => !prev);
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

  return (
    <SafeAreaView themed fullScreen tabPadding>
      <Padding fullScreen padding={spaces.md} style={{ gap: spaces.md }}>
        <Meta card={updatedCurrentCard} hide={hide} />
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
            <Card card={updatedCurrentCard} />
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

// Meta info component
const Meta = ({ card, hide }: { card: ICard; hide: boolean }) => {
  const [leftMain, rightMain, ...rest] = card.meta;

  return (
    <View>
      <View row spaceBetween wrap>
        <Text>{leftMain}</Text>
        <Text>{rightMain}</Text>
      </View>
      {hide &&
        // Group every 2 items in 'rest' into a row
        Array.from({ length: Math.ceil(rest.length / 2) }, (_, i) => (
          <View key={i} row spaceBetween wrap>
            {rest.slice(i * 2, i * 2 + 2).map((metaItem, j) => (
              <Text key={j} type="defaultSecondary">
                {metaItem}
              </Text>
            ))}
          </View>
        ))}
    </View>
  );
};

const List = ({
  list = [],
  onItemPress
}: {
  list?: IBlockListItem[];
  onItemPress: (item: IBlockListItem) => void;
}) => <BlockList center list={list} onItemPress={onItemPress} />;

// Card renderer
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
            <List key={idx} list={list} onItemPress={handleListItemPress} />
          );

        return <HighlightedText key={idx} center type={type} text={text} />;
      })}
    </Center>
  );
};

// Styles
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
