import formatColor from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { useCallback, useMemo, useState } from 'react';
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
import { cards } from '@/store/cards';
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

// Main screen component
export default function CardsScreen() {
  const colors = useGlobalStore((s) => s.computed.colors);
  const addLearnedCard = useGlobalStore((s) => s.addLearnedCard);
  const [index, setIndex] = useState(0);
  const [hide, setHide] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);

  const currentCard = cards[index];

  const transparentTextColor = useMemo(
    () => getTransparentColor(colors.text),
    [colors.text]
  );
  const transparentBackgroundColor = useMemo(
    () => getTransparentColor(colors.background),
    [colors.background]
  );

  // Memoize filtered card content
  const updatedCurrentCard = useMemo(() => {
    const filtered = filterContent(currentCard.content, hide);
    const mapped = mapListContent(filtered, hide);
    return { ...currentCard, content: mapped };
  }, [currentCard, hide]);

  // Handlers
  const handleNextPress = useCallback(() => {
    Speech.stop();
    setIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % cards.length;
      const nextCard = cards[nextIndex];
      if (nextCard.id) addLearnedCard(nextCard.id);
      return nextIndex;
    });
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const handlePrevPress = useCallback(() => {
    Speech.stop();
    setIndex((prevIndex) => {
      const prev = (prevIndex - 1 + cards.length) % cards.length;
      const prevCard = cards[prev];
      if (prevCard.id) addLearnedCard(prevCard.id);
      return prev;
    });
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

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

  return (
    <SafeAreaView themed fullScreen tabPadding>
      <Padding fullScreen padding={spaces.md} style={{ gap: spaces.md }}>
        <Meta card={currentCard} hide={hide} />
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
  const { id, level, meta, subMeta, metaSecondary, subMetaSecondary } = card;
  const idText = id ? `(#${id})` : '';
  const metaText = [meta, level, idText].filter(Boolean).join(' ');

  return (
    <View>
      <View row spaceBetween wrap>
        <Text>{metaText}</Text>
        <Text>{subMeta}</Text>
      </View>
      {hide && (
        <View row spaceBetween wrap>
          <Text type="defaultSecondary">{metaSecondary}</Text>
          <Text type="defaultSecondary">{subMetaSecondary}</Text>
        </View>
      )}
    </View>
  );
};

// Card content components
const Title = ({ text = '' }: { text?: string }) => (
  <HighlightedText center type="title" text={text} />
);
const Subtitle = ({ text = '' }: { text?: string }) => (
  <HighlightedText center type="subtitle" text={text} />
);
const DefaultSecondary = ({ text = '' }: { text?: string }) => (
  <HighlightedText center type="defaultSecondary" text={text} />
);
const DefaultSemiBold = ({ text = '' }: { text?: string }) => (
  <HighlightedText center type="defaultSemiBold" text={text} />
);
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
        switch (type) {
          case 'title':
            return <Title key={idx} text={text} />;
          case 'subtitle':
            return <Subtitle key={idx} text={text} />;
          case 'defaultSecondary':
            return <DefaultSecondary key={idx} text={text} />;
          case 'defaultSemiBold':
            return <DefaultSemiBold key={idx} text={text} />;
          case 'list':
            return (
              <List key={idx} list={list} onItemPress={handleListItemPress} />
            );
          default:
            return null;
        }
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
