import { StyleSheet } from 'react-native';

import { View, ViewProps } from '@/components/layouts/View';
import { useGlobalStore } from '@/store/useGlobalStore';

interface HorizontalLineProps extends ViewProps {
  lineProps?: ViewProps;
}

export const HorizontalLine = ({
  style,
  lineProps,
  ...viewProps
}: HorizontalLineProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <View style={styles.container} {...viewProps}>
      <View
        style={[{ backgroundColor: colors.border }, styles.default, style]}
        {...lineProps}
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
