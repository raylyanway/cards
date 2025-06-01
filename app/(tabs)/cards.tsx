import * as Speech from 'expo-speech';
import { useState } from 'react';

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
import { spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

interface Word {
  type: 'word';
  text: string;
  ipa: string;
  translation: string;
}

interface Sentence {
  type: 'sentence';
  text: string;
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

interface ListItem {
  secondaryText?: string;
  text: string;
}

interface List {
  type: 'list';
  translation: string;
  text: string;
  list: ListItem[];
}

type CardType = Word | Sentence | Rule | List;

const words: Word[] = [
  { text: 'be', ipa: '/biː/', translation: 'быть', type: 'word' },
  { text: 'have', ipa: '/hæv/', translation: 'иметь', type: 'word' }
];

const sentences: Sentence[] = [
  {
    type: 'sentence',
    text: 'Just be yourself.',
    translation: 'Просто будь собой.'
  },
  {
    type: 'sentence',
    text: 'To be or not to be, that is the question.',
    translation: 'Быть или не быть — вот в чём вопрос.'
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
      { text: 'goafsgsdfsfgds ~идтиaasfasdfasfasf~' },
      { text: 'come ~приходить~' },
      { text: 'Just be yourself. ~Просто будь собой.~' },
      { text: 'Just be yourself.', secondaryText: 'Просто будь собой.' },
      { text: 'take ~брать~' },
      { text: 'get', secondaryText: 'получать' }
    ]
  }
];

export default function CardsScreen() {
  const [index, setIndex] = useState(0);
  const cards: CardType[] = [
    ...words,
    ...sentences,
    ...pastSimpleRules,
    ...lists
  ];
  const currentCard = cards[index];

  const handleNextPress = () => {
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevPress = () => {
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleSpeakPress = () => {
    if ('word' === currentCard.type || 'sentence' === currentCard.type)
      Speech.speak(currentCard.text);
  };

  return (
    <SafeAreaView themed fullScreen>
      <ScrollView tabPadding fullScreen>
        <Padding fullScreen>
          <Meta />
          <Card card={currentCard} />
          <Controls
            onNextPress={handleNextPress}
            onPrevPress={handlePrevPress}
            onSpeakPress={handleSpeakPress}
          />
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
}

function Controls({
  onNextPress,
  onPrevPress,
  onSpeakPress
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
  onSpeakPress: () => void;
}) {
  return (
    <View style={{ gap: spaces.md }}>
      <View row style={{ justifyContent: 'center' }}>
        <BlockButton onPress={onSpeakPress}>
          <Icon name="volume-medium" />
        </BlockButton>
      </View>
      <View row style={{ justifyContent: 'center' }}>
        <BlockButton onPress={onPrevPress}>prev</BlockButton>
        <BlockButton onPress={onNextPress}>next</BlockButton>
      </View>
    </View>
  );
}

function Meta() {
  return (
    <View>
      <View row>
        <Text>verb</Text>
        <Text>бии</Text>
      </View>
      <View row>
        <Text>base</Text>
        <Text>A1 (#1)</Text>
      </View>
    </View>
  );
}

function Card({ card }: { card: CardType }) {
  switch (card.type) {
    case 'word':
      return <WordCard card={card} />;
    case 'sentence':
      return <SentenceCard card={card} />;
    case 'rule':
      return <RuleCard card={card} />;
    case 'list':
      return <ListCard card={card} />;
    default:
      return null;
  }
}

function WordCard({ card: { text, ipa, translation } }: { card: Word }) {
  return (
    <Center>
      <Text type="title">{text}</Text>
      <View row style={{ paddingTop: 5 }}>
        <Text type="defaultSecondary">{ipa}</Text>
      </View>
      <Text type="subtitle" style={{ paddingTop: 20 }}>
        {translation}
      </Text>
    </Center>
  );
}

function SentenceCard({ card: { text, translation } }: { card: Sentence }) {
  return (
    <Center>
      <Text type="title">{text}</Text>
      <Text type="subtitle" style={{ paddingTop: 20 }}>
        {translation}
      </Text>
    </Center>
  );
}

function RuleCard({ card: { title, content } }: { card: Rule }) {
  return (
    <Center>
      <View style={{ gap: spaces.xl }}>
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

function ListCard({ card: { text, translation, list } }: { card: List }) {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <Center>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 16
        }}
      >
        <Text type="subtitle">{text}</Text>
        <View row>
          <Text type="defaultSecondary">{translation}</Text>
        </View>
        <BlockList
          list={list}
          fullWidth
          style={{ marginTop: 10 }}
        />
      </View>
    </Center>
  );
}
