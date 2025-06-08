import * as Speech from 'expo-speech';
import { useState } from 'react';

import { BlockButton } from '@/components/buttons/BlockButton';
import { Icon } from '@/components/icons/Icon';
import { BlockList, BlockListItem } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { View } from '@/components/layouts/View';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config';

interface IWordCard {
  cardType: 'wordCard';
  text: string;
  ipa: string;
  ipaRead: string;
  translation: string;
  partOfSpeech: 'verb' | 'noun' | 'adjective' | 'adverb';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  id: number
}

interface IListCard {
  cardType: 'listCard';
  text: string;
  translation: string;
  list: BlockListItem[];
}

interface ITextCard {
  cardType: 'textCard';
  text: string;
  translation: string;
}

type CardType = IWordCard | IListCard | ITextCard;

const words: IWordCard[] = [
  { id: 1, text: 'be', ipa: '/biː/', ipaRead: 'бии' , translation: 'быть', cardType: 'wordCard', partOfSpeech: 'verb', level: 'A1' },
  { id: 2, text: 'have', ipa: '/hæv/', ipaRead: 'хэв' ,translation: 'иметь', cardType: 'wordCard', partOfSpeech: 'verb', level: 'A1' },
];

const texts: ITextCard[] = [
  {
    cardType: 'textCard',
    text: 'Just be yourself.',
    translation: 'Просто будь собой.'
  },
  {
    cardType: 'textCard',
    text: 'To be or not to be, that is the question.',
    translation: 'Быть или не быть — вот в чём вопрос.'
  },
  {
    cardType: 'textCard',
    text: 'The human face has two eyes, a nose, and a mouth. Above the eyes are eyebrows, and below them are cheeks. Ears are on the sides of the head.',
    translation:
      'Человеческое лицо имеет два глаза, нос и рот. Над глазами находятся брови, а под ними щеки. Уши находятся по бокам головы.'
  }
];

const lists: IListCard[] = [
  {
    cardType: 'listCard',
    text: 'Common irregular verbs',
    translation: 'Распространённые неправильные глаголы',
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
  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(false);
  const cards: CardType[] = [...words, ...lists, ...texts];
  const currentCard = cards[index];

  const handleNextPress = () => {
    Speech.stop();
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevPress = () => {
    Speech.stop();
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
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
    Speech.speak(currentCard.text);

    if (currentCard.cardType === 'listCard') {
      currentCard.list.forEach((item) => {
        if (item.text) Speech.speak(item.text);
      });
    }
  }

  const handleTranslatePress = () => {
    setTranslate((prev) => !prev);
  };

  return (
    <SafeAreaView themed fullScreen tabPadding>
      <Padding fullScreen padding={spaces.md} style={{ gap: spaces.md }}>
        <Meta />
        <Card card={currentCard} translate={translate} />
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

function Meta() {
  return (
    <View>
      <View row spaceBetween>
        <Text>verb</Text>
        <Text>бии</Text>
      </View>
      <View row spaceBetween>
        <Text>base</Text>
        <Text>A1 (#1)</Text>
      </View>
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
      <Text type="title">{text}</Text>
      <Text type="defaultSecondary">{ipa}</Text>
      {translate && <Text type="defaultSemiBold">{translation}</Text>}
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
      <HighlightedText center type="subtitle" text={text} />
      {translate && (
        <HighlightedText center type="defaultSecondary" text={translation} />
      )}
      <BlockList center list={filteredList} onItemPress={handleItemPress} />
    </Center>
  );
}
