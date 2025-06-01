import * as Speech from 'expo-speech';
import { useState } from 'react';

import { BlockButton } from '@/components/buttons/BlockButton';
import { Icon } from '@/components/icons/Icon';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config';

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

type CardType = Word | Sentence;

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

export default function CardsScreen() {
  const [index, setIndex] = useState(0);
  const cards: CardType[] = [...words, ...sentences];
  const currentCard = cards[index];

  const handleNextPress = () => {
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevPress = () => {
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleSpeakPress = () => {
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
