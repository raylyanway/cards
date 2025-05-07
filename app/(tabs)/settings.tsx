import { StyleSheet, Switch } from 'react-native';

import { Icon } from '@/components/icons/Icon';
import { Block } from '@/components/layouts/Block';
import { Padding } from '@/components/layouts/Padding';
import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { ScrollView } from '@/components/layouts/ScrollView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function SettingsScreen() {
  const colors = useGlobalStore((s) => s.computed.colors);
  const isLightTheme = useGlobalStore((s) => s.computed.isLightTheme);
  const setTheme = useGlobalStore((s) => s.setTheme);

  const handleThemeToggle = () => {
    const newTheme = isLightTheme ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <SafeAreaView themed>
      <ScrollView>
        <Padding>
          <Block paddingProps={{ style: styles.block }}>
            <View>
              <Icon name="moon" color={colors.primary} />
              <Text>Light theme</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isLightTheme ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleThemeToggle}
              value={isLightTheme}
            />
          </Block>
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spaces.md
  }
});
