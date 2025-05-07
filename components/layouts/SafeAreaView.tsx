import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps as RNSafeAreaViewProps
} from 'react-native-safe-area-context';

import { useGlobalStore } from '@/store/useGlobalStore';

export interface SafeAreaViewProps extends RNSafeAreaViewProps {
  themed?: boolean;
}

export const SafeAreaView = ({
  children,
  themed = false,
  style,
  ...safeAreaViewProps
}: SafeAreaViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const backgroundColor = themed ? colors.background : undefined;

  return (
    <RNSafeAreaView
      style={[{ backgroundColor }, style]}
      edges={['top', 'left', 'right']}
      {...safeAreaViewProps}
    >
      {children}
    </RNSafeAreaView>
  );
};
