import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps as RNSafeAreaViewProps
} from 'react-native-safe-area-context';

import { useGlobalStore } from '@/store/useGlobalStore';

export interface SafeAreaViewProps extends RNSafeAreaViewProps {
  themed?: boolean;
  fullScreen?: boolean;
}

export const SafeAreaView = ({
  children,
  themed = false,
  fullScreen = false,
  style,
  ...safeAreaViewProps
}: SafeAreaViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const backgroundColor = themed ? colors.background : undefined;
  const flex = fullScreen ? 1 : undefined;

  return (
    <RNSafeAreaView
      style={[{ backgroundColor, flex }, style]}
      edges={['top', 'left', 'right']}
      {...safeAreaViewProps}
    >
      {children}
    </RNSafeAreaView>
  );
};
