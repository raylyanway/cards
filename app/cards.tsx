import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from '@/components/layouts/SafeAreaView';
import { View } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';

export default function NotFoundScreen() {
  return (
    <SafeAreaView themed fullScreen>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text type="title">This screen does not exist.</Text>
        <Link href="/" style={styles.link}>
          <Text type="link">Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
});
