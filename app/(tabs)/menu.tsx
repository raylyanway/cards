import { Icon } from '@/components/icons/Icon';
import { List } from '@/components/layouts/List';
import { Padding } from '@/components/layouts/Padding';
import { ScrollView } from '@/components/layouts/ScrollView';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { View } from '@/components/layouts/View';
import { Switch } from '@/components/Switch';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config/typography';
import { useBoundStore } from '@/store/useBoundStore';
import { IIcon } from '@/types';

interface ISetting {
  icon: IIcon;
  text: string;
  onValueChange: () => void;
  value: boolean;
}

export default function MenuScreen() {
  const autoPronounce = useBoundStore((state) => state.autoPronounce);
  const setAutoPronounce = useBoundStore((state) => state.setAutoPronounce);
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const isLightTheme = useBoundStore(
    (state) => state.computedTheme.isLightTheme
  );
  const setTheme = useBoundStore((state) => state.setTheme);

  const handleThemeToggle = () => {
    const newTheme = isLightTheme ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleAutoPronounceToggle = () => {
    setAutoPronounce(!autoPronounce);
  };

  const settings: ISetting[] = [
    {
      icon: 'moon',
      text: 'Light theme',
      onValueChange: handleThemeToggle,
      value: isLightTheme
    },
    {
      icon: 'volume-high',
      text: 'Auto-pronounce',
      onValueChange: handleAutoPronounceToggle,
      value: autoPronounce
    }
  ];

  return (
    <TabSafeAreaView themed fullScreen>
      <ScrollView>
        <Padding style={{ gap: spaces.md }}>
          <Text type="subtitle">Settings</Text>
          <List
            fullWidth
            list={settings}
            renderItem={({ icon, text, onValueChange, value }) => (
              <View row spaceBetween>
                <View row style={{ gap: spaces.md }}>
                  <Icon name={icon} color={colors.primary} />
                  <Text>{text}</Text>
                </View>
                <Switch onValueChange={onValueChange} value={value} />
              </View>
            )}
          />
        </Padding>
      </ScrollView>
    </TabSafeAreaView>
  );
}
