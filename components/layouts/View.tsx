import {
  View as RNView,
  ViewProps as RNViewProps,
  StyleSheet
} from 'react-native';

import { spaces } from '@/config';
import { useGlobalStore } from '@/store/useGlobalStore';

export interface ViewProps extends RNViewProps {
  themed?: boolean;
  row?: boolean;
}

export const View = ({
  style,
  themed = false,
  row = false,
  ...viewProps
}: ViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const backgroundColor = themed ? colors.background : undefined;
  const rowStyle = row ? styles.row : undefined;

  return (
    <RNView style={[{ backgroundColor }, rowStyle, style]} {...viewProps} />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spaces.md
  }
});
