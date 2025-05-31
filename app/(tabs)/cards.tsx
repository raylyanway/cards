import { BlockButton } from '@/components/buttons/BlockButton';
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
          <Word />
          <Controls />
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
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

function Word() {
  return (
    <Center style={{ borderColor: 'green', borderWidth: 1 }}>
      <Text type="title">be</Text>
      <Text type="defaultSecondary">/biː/</Text>
      <Text type="subtitle">быть</Text>
    </Center>
  );
}
