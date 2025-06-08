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
  fullScreen?: boolean;
  spaceBetween?: boolean;
}

export const View = ({
  style,
  themed = false,
  row = false,
  fullScreen = false,
  spaceBetween = false,
  ...viewProps
}: ViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const backgroundColor = themed ? colors.background : undefined;
  const rowStyle = row ? styles.row : undefined;
  const flex = fullScreen ? 1 : undefined;
  const justifyContent = spaceBetween ? styles.spaceBetween : undefined;

  return (
    <RNView
      style={[{ backgroundColor, flex }, rowStyle, justifyContent, style]}
      {...viewProps}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaces.md
  },
  spaceBetween: {
    justifyContent: 'space-between'
  }
});
