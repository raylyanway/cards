import * as Speech from 'expo-speech';
import { useState } from 'react';

import { BlockButton } from '@/components/buttons/BlockButton';
import { IconButton } from '@/components/buttons/IconButton';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';

interface Word {
  word: string;
  ipa: string;
  translation: string;
}

const words: Word[] = [
  { word: 'be', ipa: '/biː/', translation: 'быть' },
  { word: 'have', ipa: '/hæv/', translation: 'иметь' },
  { word: 'do', ipa: '/duː/', translation: 'делать' },
  { word: 'say', ipa: '/seɪ/', translation: 'сказать' },
  { word: 'go', ipa: '/ɡoʊ/', translation: 'идти' },
  { word: 'get', ipa: '/ɡet/', translation: 'получать' },
  { word: 'make', ipa: '/meɪk/', translation: 'делать' },
  { word: 'know', ipa: '/noʊ/', translation: 'знать' },
  { word: 'think', ipa: '/θɪŋk/', translation: 'думать' },
  { word: 'take', ipa: '/teɪk/', translation: 'брать' }
];

export default function CardsScreen() {
  const [index, setIndex] = useState(0);
  const currentWord = words[index];

  const handleNextPress = () => {
    setIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrevPress = () => {
    setIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  return (
    <SafeAreaView themed fullScreen>
      <ScrollView tabPadding fullScreen>
        <Padding fullScreen>
          <Meta />
          <WordCard word={currentWord} />
          <Controls
            onNextPress={handleNextPress}
            onPrevPress={handlePrevPress}
          />
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
}

function SpeakButton({ text }: { text: string }) {
  const speak = () => {
    Speech.speak(text);
  };

  return <IconButton iconProps={{ name: 'volume-medium' }} onPress={speak} />;
}

function Controls({
  onNextPress,
  onPrevPress
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
}) {
  return (
    <View row style={{ justifyContent: 'center' }}>
      <BlockButton onPress={onPrevPress}>prev</BlockButton>
      <BlockButton onPress={onNextPress}>next</BlockButton>
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

function WordCard({ word: { word, ipa, translation } }: { word: Word }) {
  return (
    <Center>
      <Text type="title">{word}</Text>
      <View row style={{ paddingTop: 5 }}>
        <Text type="defaultSecondary">{ipa}</Text>
        <SpeakButton text={word} />
      </View>
      <Text type="subtitle" style={{ paddingTop: 20 }}>
        {translation}
      </Text>
    </Center>
  );
}

function WordUsageCard({ word }: { word: string }) {
  return (
    <Center>
      <Text type="title">{word}</Text>
      <View row style={{ paddingTop: 5 }}>
        <Text type="defaultSecondary">/biː/</Text>
        <SpeakButton text={word} />
      </View>
      <Text type="subtitle" style={{ paddingTop: 20 }}>
        быть
      </Text>
    </Center>
  );
}
