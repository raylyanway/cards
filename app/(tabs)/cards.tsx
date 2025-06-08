import * as Speech from 'expo-speech';
import { useState } from 'react';

import { BlockButton } from '@/components/buttons/BlockButton';
import { IconButton } from '@/components/buttons/IconButton';
import { Icon } from '@/components/icons/Icon';
import { BlockList } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
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
  startSlot?: React.ReactNode;
}

interface List {
  type: 'list';
  translation: string;
  text: string;
  list: ListItem[];
}

interface TextCardType {
  type: 'textCard';
  translation: string;
  text: string;
}

type CardType = Word | Sentence | Rule | List | TextCardType;

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
      {
        text: 'Just be yourself.',
        secondaryText: 'Просто будь собой.',
        startSlot: <SpeakButton text="Just be yourself." />
      },
      { text: 'take ~брать~' },
      {
        text: 'get',
        secondaryText: 'получать',
        startSlot: <SpeakButton text="get" />
      }
    ]
  }
];

const texts: TextCardType[] = [
  {
    type: 'textCard',
    text: 'Just be yourself.',
    translation: 'Просто будь собой.'
  },
  {
    type: 'textCard',
    text: 'This is a text card.',
    translation: 'Это карточка с текстом.'
  },
  {
    type: 'textCard',
    text: 'Another text card with more information.',
    translation: 'Ещё одна карточка с текстом и дополнительной информацией.'
  },
  {
    type: 'textCard',
    text: 'The human face has two eyes, a nose, and a mouth. Above the eyes are eyebrows, and below them are cheeks. Ears are on the sides of the head. The forehead is above the eyes, and the chin is below the mouth. Each face is unique and shows emotions like happiness, sadness, or surprise.',
    translation:
      'Человеческое лицо имеет два глаза, нос и рот. Над глазами находятся брови, а под ними щеки. Уши находятся по бокам головы. Лоб находится над глазами, а подбородок под ртом. Каждое лицо уникально и показывает такие эмоции, как счастье, грусть или удивление.'
  }
];

export default function CardsScreen() {
  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(false);
  const cards: CardType[] = [
    ...words,
    ...sentences,
    ...pastSimpleRules,
    ...lists,
    ...texts
  ];
  const currentCard = cards[index];

  const handleNextPress = () => {
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setTranslate(false);
  };

  const handlePrevPress = () => {
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleSpeakPress = () => {
    if ('word' === currentCard.type || 'sentence' === currentCard.type)
      Speech.speak(currentCard.text);
  };

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

function Card({ card, ...props }: { card: CardType; translate: boolean }) {
  switch (card.type) {
    case 'word':
      return <WordCard card={card} {...props} />;
    case 'sentence':
      return <SentenceCard card={card} {...props} />;
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

function SentenceCard({
  card: { text, translation },
  translate
}: {
  card: Sentence;
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

function ListCard({
  card: { text, translation, list },
  translate
}: {
  card: List;
  translate: boolean;
}) {
  return (
    <Center>
      <Text type="subtitle">{text}</Text>
      {translate && (
        <View row>
          <Text type="defaultSecondary" style={{ textAlign: 'center' }}>
            {translation}
          </Text>
        </View>
      )}
      <BlockList list={list} fullWidth style={{ marginTop: 10 }} />
    </Center>
  );
}

function TextCard({ card: { text, translation } }: { card: TextCardType }) {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <Center>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 16,
          gap: spaces.sm
        }}
      >
        <Text type="subtitle">{text}</Text>
        <Text type="defaultSecondary">{translation}</Text>
      </View>
    </Center>
  );
}
