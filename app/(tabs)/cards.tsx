import * as Speech from 'expo-speech';

import { BlockButton } from '@/components/buttons/BlockButton';
import { IconButton } from '@/components/buttons/IconButton';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';

export default function CardsScreen() {
  return (
    <SafeAreaView themed fullScreen>
      <ScrollView tabPadding fullScreen>
        <Padding fullScreen style={{ borderColor: 'green', borderWidth: 1 }}>
          <Meta />
          <Word word="be" />
          <Controls />
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

function Controls() {
  return (
    <View row style={{ justifyContent: 'center' }}>
      <BlockButton>prev</BlockButton>
      <BlockButton>next</BlockButton>
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

function Word({ word }: { word: string }) {
  return (
    <Center style={{ borderColor: 'green', borderWidth: 1 }}>
      <Text type="title">{word}</Text>
      <View row>
        <Text type="defaultSecondary">/biː/</Text>
        <SpeakButton text={word} />
      </View>
      <Text type="subtitle">быть</Text>
    </Center>
  );
}
