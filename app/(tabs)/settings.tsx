import { Icon } from '@/components/icons/Icon';
import { Block } from '@/components/layouts/Block';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { Switch } from '@/components/Switch';
import { Text } from '@/components/texts/Text';
import { useBoundStore } from '@/store/useBoundStore';

export default function SettingsScreen() {
  const colors = useBoundStore((state) => state.getColors)();
  const isLightTheme = useBoundStore((state) => state.getIsLightTheme)();
  const setTheme = useBoundStore((state) => state.setTheme);

  const handleThemeToggle = () => {
    const newTheme = isLightTheme ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <SafeAreaView themed fullScreen>
      <ScrollView>
        <Padding>
          <Block row fullWidth>
            <View row>
              <Icon name="moon" color={colors.primary} />
              <Text>Light theme</Text>
            </View>
            <Switch onValueChange={handleThemeToggle} value={isLightTheme} />
          </Block>
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
}
