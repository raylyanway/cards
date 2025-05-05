import { StyleSheet, View, ViewProps } from 'react-native';

import { useGlobalStore } from '@/store/useGlobalStore';

interface HorizontalLineProps extends ViewProps {
  containerProps?: ViewProps;
}

export const HorizontalLine = ({
  style,
  containerProps,
  ...viewProps
}: HorizontalLineProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <View style={styles.container} {...containerProps}>
      <View
        style={[{ backgroundColor: colors.border }, styles.default, style]}
        {...viewProps}
      />
    </View>
  );
};

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
