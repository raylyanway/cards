import { Icon } from '@/components/icons/Icon';
import { Block } from '@/components/layouts/Block';
import { Padding } from '@/components/layouts/Padding';
import { ScrollView } from '@/components/layouts/ScrollView';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { View } from '@/components/layouts/View';
import { Switch } from '@/components/Switch';
import { Text } from '@/components/texts/Text';
import { useBoundStore } from '@/store/useBoundStore';

export default function SettingsScreen() {
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const isLightTheme = useBoundStore(
    (state) => state.computedTheme.isLightTheme
  );
  const setTheme = useBoundStore((state) => state.setTheme);

  const handleThemeToggle = () => {
    const newTheme = isLightTheme ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <TabSafeAreaView themed fullScreen>
      <ScrollView>
        <Padding style={{ gap: 5 }}>
          <Block row fullWidth>
            <View row>
              <Icon name="moon" color={colors.primary} />
              <Text>Light theme</Text>
            </View>
            <Switch onValueChange={handleThemeToggle} value={isLightTheme} />
          </Block>
          <Block row fullWidth>
            <View row>
              <Icon name="volume-high" color={colors.primary} />
              <Text>Auto-pronounce</Text>
            </View>
            <Switch onValueChange={handleThemeToggle} value={isLightTheme} />
          </Block>
        </Padding>
      </ScrollView>
    </TabSafeAreaView>
  );
}
