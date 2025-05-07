import { StyleSheet, Switch } from 'react-native';

import { Icon } from '@/components/icons';
import {
  Block,
  Padding,
  SafeAreaView,
  ScrollView,
  View
} from '@/components/layouts';
import { Text } from '@/components/texts';
import { spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function SettingsScreen() {
  const colors = useGlobalStore((s) => s.computed.colors);
  const theme = useGlobalStore((s) => s.theme);
  const setTheme = useGlobalStore((s) => s.setTheme);

  const isDarkTheme = theme === 'dark';

  const handleThemeToggle = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Padding>
          <Block paddingProps={{ style: styles.block }}>
            <View>
              <Icon name="moon" color={colors.primary} />
              <Text>Dark theme</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleThemeToggle}
              value={isDarkTheme}
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
