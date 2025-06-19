import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { Icon } from '@/components/icons/Icon';
import { BlockList, BlockListItem } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

type LevelType = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface IContent {
  type: 'title' | 'subtitle' | 'defaultSecondary' | 'defaultSemiBold' | 'list';
  text?: string;
  list?: BlockListItem[];
  hide?: boolean;
  speak?: boolean;
}

interface ICard {
  id?: number;
  level?: LevelType;
  meta?: string;
  subMeta?: string;
  metaSecondary?: string;
  subMetaSecondary?: string;
  content: IContent[];
}

const cards: ICard[] = [
  {
    id: 1,
    level: 'A1',
    meta: 'verb',
    subMeta: 'бии',
    metaSecondary: 'глагол',
    content: [
      { type: 'title', text: 'bebebebebebebebebebebebebebe', speak: true },
      { type: 'defaultSecondary', text: '/biː/' },
      { type: 'defaultSemiBold', text: 'быть', hide: true }
    ]
  },
  {
    id: 2,
    level: 'A1',
    meta: 'verb',
    subMeta: 'хэв',
    metaSecondary: 'глагол',
    content: [
      { type: 'title', text: 'have', speak: true },
      { type: 'defaultSecondary', text: '/hæv/' },
      { type: 'defaultSemiBold', text: 'иметь', hide: true }
    ]
  },
  {
    id: 1,
    level: 'A1',
    meta: 'quote',
    subMeta: 'self-affirmation',
    metaSecondary: 'цитата',
    subMetaSecondary: 'самоутверждение',
    content: [
      { type: 'subtitle', text: 'Just be yourself.', speak: true },
      { type: 'defaultSecondary', text: 'Просто будь собой.', hide: true }
    ]
  },
  {
    id: 2,
    level: 'A1',
    meta: 'quote',
    subMeta: 'philosophical',
    metaSecondary: 'цитата',
    subMetaSecondary: 'философская',
    content: [
      {
        type: 'subtitle',
        text: 'To be or not to be, that is the question.',
        speak: true
      },
      {
        type: 'defaultSecondary',
        text: 'Быть или не быть — вот в чём вопрос.',
        hide: true
      }
    ]
  },
  {
    id: 3,
    level: 'A1',
    meta: 'description',
    subMeta: 'face anatomy',
    metaSecondary: 'описание',
    subMetaSecondary: 'анатомия лица',
    content: [
      {
        type: 'subtitle',
        text: 'The human face has two eyes, a nose, and a mouth. Above the eyes are eyebrows, and below them are cheeks. Ears are on the sides of the head.',
        speak: true
      },
      {
        type: 'defaultSecondary',
        text: 'Человеческое лицо имеет два глаза, нос и рот. Над глазами находятся брови, а под ними щеки. Уши находятся по бокам головы.',
        hide: true
      }
    ]
  },
  {
    id: 1,
    level: 'A1',
    meta: 'irregular verbs',
    metaSecondary: 'неправильные глаголы',
    content: [
      {
        speak: true,
        hide: true,
        type: 'list',
        list: [
          {
            text: 'Just be yourself.',
            secondaryText: 'Просто будь собой.'
          },
          {
            text: 'Just be yourself.1',
            secondaryText: 'Просто будь собой.',
            icon: 'volume-medium'
          },
          {
            text: 'get1',
            secondaryText: 'получать',
            icon: 'volume-medium'
          },
          {
            text: 'get',
            secondaryText: 'получать',
            icon: 'volume-medium'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    level: 'A1',
    meta: 'grammar',
    // subMeta: 'verb forms',
    // metaSecondary: 'грамматика',
    subMetaSecondary: 'формы глагола',
    content: [
      {
        type: 'subtitle',
        text: 'Add ~-ed~ to the base form of the verb',
        speak: true
      },
      {
        type: 'defaultSecondary',
        text: 'Добавьте ~-ed~ к базовой форме глагола',
        hide: true
      },
      {
        speak: true,
        hide: true,
        type: 'list',
        list: [
          {
            text: 'I worked hard yesterday.',
            secondaryText: 'Вчера я много работал.',
            icon: 'volume-medium'
          },
          {
            text: 'We played soccer in the park.',
            secondaryText: 'Мы играли в футбол в парке.',
            icon: 'volume-medium'
          }
        ]
      }
    ]
  }
];

export default function CardsScreen() {
  const colors = useGlobalStore((s) => s.computed.colors);

  const [index, setIndex] = useState(0);
  const [hide, setHide] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);
  let currentCard = cards[index];
  const transparentTextColor = Color(colors.text).alpha(0.1).rgb().string();
  const transparentBackgroundColor = Color(colors.background)
    .alpha(0.1)
    .rgb()
    .string();

  const currentCardWithoutHideContent = currentCard.content.reduce(
    (acc, content) => {
      if (content.type !== 'list' && content.hide && !hide) return acc;

      acc = [...acc, content];

      return acc;
    },
    [] as IContent[]
  );

  const currentCardWithoutHideContentInList = currentCardWithoutHideContent.map(
    (content) => {
      if (content.type === 'list' && content.hide && content.list) {
        return {
          ...content,
          list: content.list.map((item) => ({
            ...item,
            secondaryText: hide ? item.secondaryText : undefined
          }))
        };
      }
      return content;
    }
  );

  const updatedCurrentCard: ICard = {
    ...currentCard,
    content: currentCardWithoutHideContentInList
  };

  const handleNextPress = () => {
    Speech.stop();
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
  };

  const handlePrevPress = () => {
    Speech.stop();
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
  };

  const handleSpeakPress = async () => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
      return;
    }

    speakCurrentCard();
  };

  function speakCurrentCard() {
    currentCard.content.forEach((item) => {
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

  const handleTranslatePress = () => {
    setHide((prev) => !prev);
    setShowTopIndicator(false);
    setShowBottomIndicator(false);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const visibleHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;
    setShowTopIndicator(scrollY > 2); // 2px tolerance
    setShowBottomIndicator(scrollY + visibleHeight < contentHeight - 2);
  };

  return (
    <SafeAreaView themed fullScreen tabPadding>
      <Padding fullScreen padding={spaces.md} style={{ gap: spaces.md }}>
        <Meta card={currentCard} hide={hide} />
        <View style={{ flex: 1, position: 'relative' }}>
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
  }
});

function Controls({
  onNextPress,
  onPrevPress,
  onSpeakPress,
  onTranslatePress
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
  onSpeakPress: () => void;
  onTranslatePress: () => void;
}) {
  return (
    <View style={{ gap: spaces.md }}>
      <View row style={{ justifyContent: 'center' }}>
        <BlockButton onPress={onPrevPress}>prev</BlockButton>
        <BlockButton onPress={onNextPress}>next</BlockButton>
        <BlockButton onPress={onSpeakPress}>
          <Icon name="volume-medium" />
        </BlockButton>
        <BlockButton onPress={onTranslatePress}>
          <Icon name="language" />
        </BlockButton>
      </View>
    </View>
  );
}

function Meta({ card, hide }: { card: ICard; hide: boolean }) {
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
}

function Title({ text = '' }) {
  return <HighlightedText center type="title" text={text} />;
}

function Subtitle({ text = '' }) {
  return <HighlightedText center type="subtitle" text={text} />;
}

function DefaultSecondary({ text = '' }) {
  return <HighlightedText center type="defaultSecondary" text={text} />;
}

function DefaultSemiBold({ text = '' }) {
  return <HighlightedText center type="defaultSemiBold" text={text} />;
}

function List({
  list = [],
  onItemPress
}: {
  list?: BlockListItem[];
  onItemPress: (item: BlockListItem) => void;
}) {
  return <BlockList center list={list} onItemPress={onItemPress} />;
}

function Card({ card }: { card: ICard }) {
  const content = card.content.map((content, index) => {
    const { text, type, list } = content;

    switch (type) {
      case 'title':
        return <Title key={index} text={text} />;
      case 'subtitle':
        return <Subtitle key={index} text={text} />;
      case 'defaultSecondary':
        return <DefaultSecondary key={index} text={text} />;
      case 'defaultSemiBold':
        return <DefaultSemiBold key={index} text={text} />;
      case 'list':
        return (
          <List
            key={index}
            list={list}
            onItemPress={(item) => {
              if (item.icon === 'volume-medium') {
                Speech.speak(item.text);
              }
            }}
          />
        );
      default:
        return null;
    }
  });

  return <Center style={{ gap: spaces.xs }}>{content}</Center>;
}
