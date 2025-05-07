import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { Text } from '@/components/texts/Text';

export default function CardsScreen() {
  return (
    <SafeAreaView themed>
      <ScrollView>
        <Text>Cards</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
