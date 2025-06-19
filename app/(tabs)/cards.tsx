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

interface IWordCard {
  cardType: 'wordCard';
  text: string;
  ipa: string;
  translation: string;
  meta: 'verb' | 'noun' | 'adjective' | 'adverb';
  level: LevelType;
  id: number;
  metaSecondary?: string;
  metaTranslation?: string;
  metaSecondaryTranslation?: string;
}

interface IListCard {
  cardType: 'listCard';
  text?: string;
  translation?: string;
  list: BlockListItem[];
  meta:
    | 'antonyms'
    | 'synonyms'
    | 'irregular verbs'
    | 'phrasal verbs'
    | 'collocations'
    | 'idioms'
    | 'phrases'
    | 'grammar'
    | 'vocabulary'
    | 'expressions'
    | 'prepositions'
    | 'conjunctions'
    | 'interjections'
    | 'rank';
  level: LevelType;
  id: number;
  metaSecondary?: string;
  metaTranslation?: string;
  metaSecondaryTranslation?: string;
}

interface ITextCard {
  cardType: 'textCard';
  text: string;
  translation: string;
  meta:
    | 'quote'
    | 'proverb'
    | 'saying'
    | 'definition'
    | 'example'
    | 'dialogue'
    | 'story'
    | 'article'
    | 'news'
    | 'essay'
    | 'letter'
    | 'poem'
    | 'speech'
    | 'review'
    | 'summary'
    | 'report'
    | 'commentary'
    | 'analysis'
    | 'critique'
    | 'reflection'
    | 'opinion'
    | 'argument'
    | 'explanation'
    | 'description'
    | 'narrative'
    | 'exposition'
    | 'argumentation'
    | 'persuasion'
    | 'exemplification'
    | 'comparison'
    | 'contrast'
    | 'classification'
    | 'cause and effect'
    | 'process'
    | 'problem and solution'
    | 'chronology'
    | 'sequence'
    | 'spatial order'
    | 'thematic'
    | 'topical'
    | 'functional'
    | 'analytical'
    | 'topic';
  level: LevelType;
  id: number;
  metaSecondary?: string;
  metaTranslation?: string;
  metaSecondaryTranslation?: string;
}

type CardType = IWordCard | IListCard | ITextCard;

const words: IWordCard[] = [
  {
    id: 1,
    text: 'bebebebebebebebebebebebebebe',
    ipa: '/biː/',
    metaSecondary: 'бии',
    translation: 'быть',
    cardType: 'wordCard',
    meta: 'verb',
    level: 'A1',
    metaTranslation: 'глагол'
  },
  {
    id: 2,
    text: 'have',
    ipa: '/hæv/',
    metaSecondary: 'хэв',
    translation: 'иметь',
    cardType: 'wordCard',
    meta: 'verb',
    level: 'A1',
    metaTranslation: 'глагол'
  }
];

const texts: ITextCard[] = [
  {
    cardType: 'textCard',
    text: 'Just be yourself.',
    translation: 'Просто будь собой.',
    id: 1,
    meta: 'quote',
    level: 'A1',
    metaSecondary: 'self-affirmation',
    metaTranslation: 'цитата',
    metaSecondaryTranslation: 'самоутверждение'
  },
  {
    cardType: 'textCard',
    text: 'To be or not to be, that is the question.',
    translation: 'Быть или не быть — вот в чём вопрос.',
    id: 2,
    meta: 'quote',
    level: 'A1',
    metaSecondary: 'philosophical',
    metaTranslation: 'цитата',
    metaSecondaryTranslation: 'философская'
  },
  {
    cardType: 'textCard',
    text: 'The human face has two eyes, a nose, and a mouth. Above the eyes are eyebrows, and below them are cheeks. Ears are on the sides of the head.',
    translation:
      'Человеческое лицо имеет два глаза, нос и рот. Над глазами находятся брови, а под ними щеки. Уши находятся по бокам головы.',
    id: 3,
    meta: 'description',
    level: 'A1',
    metaSecondary: 'face anatomy',
    metaTranslation: 'описание',
    metaSecondaryTranslation: 'анатомия лица'
  }
];

const lists: IListCard[] = [
  {
    id: 1,
    level: 'A1',
    meta: 'irregular verbs',
    cardType: 'listCard',
    metaTranslation: 'неправильные глаголы',
    // text: 'Common irregular verbs',
    // translation: 'Распространённые неправильные глаголы',
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
  },
  {
    id: 2,
    level: 'A1',
    meta: 'grammar',
    metaSecondary: 'verb forms',
    metaTranslation: 'грамматика',
    metaSecondaryTranslation: 'формы глагола',
    cardType: 'listCard',
    text: 'Add ~-ed~ to the base form of the verb',
    translation: 'Добавьте ~-ed~ к базовой форме глагола',
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
];

export default function CardsScreen() {
  const colors = useGlobalStore((s) => s.computed.colors);

  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);
  const cards: CardType[] = [...words, ...lists, ...texts];
  const currentCard = cards[index];
  const transparentTextColor = Color(colors.text).alpha(0.1).rgb().string();
  const transparentBackgroundColor = Color(colors.background)
    .alpha(0.1)
    .rgb()
    .string();

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
    setTranslate(false);
  };

  function speakCurrentCard() {
    if (currentCard.text) Speech.speak(currentCard.text);

    if (currentCard.cardType === 'listCard') {
      currentCard.list.forEach((item) => {
        if (item.text) Speech.speak(item.text);
      });
    }
  }

  const handleTranslatePress = () => {
    setTranslate((prev) => !prev);
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
        <Meta card={currentCard} translate={translate} />
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
            <Card card={currentCard} translate={translate} />
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

function Meta({ card, translate }: { card: CardType; translate: boolean }) {
  const {
    meta,
    metaSecondary,
    metaTranslation,
    metaSecondaryTranslation,
    level,
    id
  } = card;

  return (
    <View>
      <View row spaceBetween wrap>
        <View row wrap>
          <Text>{meta}</Text>
          <View row>
            <Text>{level}</Text>
            <Text>{`(#${id})`}</Text>
          </View>
        </View>
        {metaSecondary && <Text>{metaSecondary}</Text>}
      </View>
      {translate && (
        <View row spaceBetween wrap>
          {metaTranslation && (
            <Text type="defaultSecondary">{metaTranslation}</Text>
          )}
          {metaSecondaryTranslation && (
            <Text type="defaultSecondary">{metaSecondaryTranslation}</Text>
          )}
        </View>
      )}
    </View>
  );
}

function Card({ card, ...props }: { card: CardType; translate: boolean }) {
  switch (card.cardType) {
    case 'wordCard':
      return <WordCard card={card} {...props} />;
    case 'listCard':
      return <ListCard card={card} {...props} />;
    case 'textCard':
      return <TextCard card={card} {...props} />;
    default:
      return null;
  }
}

function WordCard({
  card: { text, ipa, translation },
  translate
}: {
  card: IWordCard;
  translate: boolean;
}) {
  return (
    <Center style={{ gap: spaces.xs }}>
      <Text center type="title">
        {text}
      </Text>
      <Text center type="defaultSecondary">
        {ipa}
      </Text>
      {translate && (
        <Text center type="defaultSemiBold">
          {translation}
        </Text>
      )}
    </Center>
  );
}

function TextCard({
  card: { text, translation },
  translate
}: {
  card: ITextCard;
  translate: boolean;
}) {
  return (
    <Center style={{ gap: spaces.xs }}>
      <Text center type="subtitle">
        {text}
      </Text>
      {translate && (
        <Text center type="defaultSecondary">
          {translation}
        </Text>
      )}
    </Center>
  );
}

function ListCard({
  card: { text, translation, list },
  translate
}: {
  card: IListCard;
  translate: boolean;
}) {
  const filteredList = list.map((item) => {
    if (translate) return item;

    return translate
      ? item
      : {
          ...item,
          secondaryText: undefined
        };
  });

  const handleItemPress = (item: BlockListItem) => {
    if (item.icon === 'volume-medium') {
      Speech.speak(item.text);
    }
  };

  return (
    <Center style={{ gap: spaces.xs }}>
      {text && <HighlightedText center type="subtitle" text={text} />}
      {translate && (
        <HighlightedText center type="defaultSecondary" text={translation} />
      )}
      <BlockList center list={filteredList} onItemPress={handleItemPress} />
    </Center>
  );
}
