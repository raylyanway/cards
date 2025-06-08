import * as Speech from 'expo-speech';
import { useState } from 'react';

import { BlockButton } from '@/components/buttons/BlockButton';
import { IconButton } from '@/components/buttons/IconButton';
import { Icon } from '@/components/icons/Icon';
import { BlockList, BlockListItem } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { View } from '@/components/layouts/View';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config';

interface Word {
  type: 'word';
  text: string;
  ipa: string;
  translation: string;
}

interface RuleExample {
  secondaryText: string;
  text: string;
}

interface RuleContentItem {
  examples: RuleExample[];
  subtitle?: string;
  title: string;
}

interface Rule {
  type: 'rule';
  content: RuleContentItem[];
  title: string;
}

interface List {
  type: 'list';
  translation: string;
  text: string;
  list: BlockListItem[];
}

interface TextCardType {
  type: 'textCard';
  translation: string;
  text: string;
}

type CardType = Word | Rule | List | TextCardType;

const words: Word[] = [
  { text: 'be', ipa: '/biː/', translation: 'быть', type: 'word' },
  { text: 'have', ipa: '/hæv/', translation: 'иметь', type: 'word' }
];

const texts: TextCardType[] = [
  {
    type: 'textCard',
    text: 'Just be yourself.',
    translation: 'Просто будь собой.'
  },
  {
    type: 'textCard',
    text: 'To be or not to be, that is the question.',
    translation: 'Быть или не быть — вот в чём вопрос.'
  },
  {
    type: 'textCard',
    text: 'The human face has two eyes, a nose, and a mouth. Above the eyes are eyebrows, and below them are cheeks. Ears are on the sides of the head.',
    translation:
      'Человеческое лицо имеет два глаза, нос и рот. Над глазами находятся брови, а под ними щеки. Уши находятся по бокам головы.'
  }
];

const pastSimpleRules: Rule[] = [
  {
    type: 'rule',
    title: 'Usage',
    content: [
      {
        title: 'Completed actions in the past',
        examples: [
          {
            text: 'I watched a movie last night.',
            secondaryText: 'Вчера вечером я смотрел фильм.'
          },
          {
            text: 'She lived in Paris for five years.',
            secondaryText: 'Она прожила в Париже пять лет.'
          }
        ]
      },
      {
        title: 'Habits or repeated actions in the past',
        examples: [
          {
            text: 'We went to the park every weekend.',
            secondaryText: 'Каждые выходные мы ходили в парк.'
          },
          {
            text: 'He studied hard for the exam.',
            secondaryText: 'Он усердно готовился к экзамену.'
          }
        ]
      },
      {
        title: 'Past states',
        examples: [
          {
            text: 'I was happy yesterday.',
            secondaryText: 'Вчера я был счастлив.'
          },
          {
            text: 'They were tired after the long journey.',
            secondaryText: 'Они устали после долгого путешествия.'
          }
        ]
      }
    ]
  },
  {
    type: 'rule',
    title: 'How to form',
    content: [
      {
        title: 'Add ~-ed~ to the base form of the verb',
        subtitle: 'Regular verbs',
        examples: [
          {
            text: 'I worked hard yesterday.',
            secondaryText: 'Вчера я много работал.'
          },
          {
            text: 'We played soccer in the park.',
            secondaryText: 'Мы играли в футбол в парке.'
          }
        ]
      }
      // {
      //   title: 'Irregular verbs',
      //   subtitle:
      //     'These verbs have specific past tense forms that must be memorized',
      //   examples: [
      //     {
      //       text: 'I went ~(go)~ to the store yesterday.',
      //       secondaryText: 'Вчера я ходил в магазин.'
      //     },
      //     {
      //       text: 'She came ~(come)~ to the party late.',
      //       secondaryText: 'Она пришла на вечеринку поздно.'
      //     }
      //   ]
      // }
    ]
  }
];

const lists: List[] = [
  {
    type: 'list',
    text: 'Common irregular verbs',
    translation: 'Распространённые неправильные глаголы',
    list: [
      {
        text: 'Just be yourself.',
        secondaryText: 'Просто будь собой.'
        // icon: <SpeakButton text="Just be yourself." />
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
];

export default function CardsScreen() {
  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(false);
  const cards: CardType[] = [...words, ...pastSimpleRules, ...lists, ...texts];
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
    if (
      currentCard.type === 'word' ||
      currentCard.type === 'textCard' ||
      currentCard.type === 'list'
    ) {
      Speech.speak(currentCard.text);
    }

    if (currentCard.type === 'list') {
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

function SpeakButton({ text }: { text: string }) {
  const handleSpeakPress = () => {
    Speech.speak(text);
  };

  return <IconButton name="volume-medium" onPress={handleSpeakPress} />;
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
  switch (card.type) {
    case 'word':
      return <WordCard card={card} {...props} />;
    case 'rule':
      return <RuleCard card={card} {...props} />;
    case 'list':
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
  card: Word;
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
  card: TextCardType;
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

function RuleCard({ card: { title, content } }: { card: Rule }) {
  return (
    <Center>
      <View style={{ gap: spaces.xs }}>
        <Text type="title">{title}</Text>
        {content.map(({ title, subtitle, examples }) => (
          <View key={title} style={{ gap: spaces.xs }}>
            <HighlightedText highlightedTextProps={{ type: 'subtitle' }}>
              {title}
            </HighlightedText>
            {subtitle && <Text type="defaultSecondary">{subtitle}</Text>}
            <BlockList style={{ marginTop: spaces.sm }} list={examples} />
          </View>
        ))}
      </View>
    </Center>
  );
}

function ListCard({
  card: { text, translation, list },
  translate
}: {
  card: List;
  translate: boolean;
}) {
  const filteredList = list.map((item) => {
    if (translate) return item;

    return translate
      ? item
      : {
          ...item,
          // text: item.text.replace(/~.*?~/g, ''),
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
      <Text center type="subtitle">
        {text}
      </Text>
      {translate && (
        <Text center type="defaultSecondary" style={{ textAlign: 'center' }}>
          {translation}
        </Text>
      )}
      <BlockList center list={filteredList} onItemPress={handleItemPress} />
    </Center>
  );
}
