import { StyleSheet, View, ViewProps } from 'react-native';

import { useGlobalStore } from '@/store/useGlobalStore';

export function HorizontalLine({ style, ...rest }: ViewProps) {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <View style={styles.container}>
      <View
        style={[{ backgroundColor: colors.border }, styles.default, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex'
  },
  default: {
    height: 1,
    marginVertical: 10,
    width: '80%'
  }
});