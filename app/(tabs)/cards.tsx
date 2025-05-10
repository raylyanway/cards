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
          <View row>
            <Text>verb</Text>
            <Text>бии</Text>
          </View>
          <View row>
            <Text>base</Text>
            <Text>A1 (#1)</Text>
          </View>
          <Center style={{ borderColor: 'green', borderWidth: 1 }}>
            <Text type="title">be</Text>
          </Center>
          <View row style={{ justifyContent: 'center' }}>
            <BlockButton>prev</BlockButton>
            <BlockButton>next</BlockButton>
          </View>
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
}
