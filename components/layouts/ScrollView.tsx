import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps
} from 'react-native';

import { useGlobalStore } from '@/store/useGlobalStore';

interface ScrollViewProps extends RNScrollViewProps {
  themed?: boolean;
  fullScreen?: boolean;
}

export const ScrollView = ({
  children,
  style,
  themed = false,
  fullScreen = false,
  ...scrollViewProps
}: ScrollViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const backgroundColor = themed ? colors.background : undefined;
  const contentContainerStyle = fullScreen ? { flexGrow: 1 } : undefined;

  return (
    <RNScrollView
      centerContent={true}
      alwaysBounceVertical={false}
      style={[{ backgroundColor }, style]}
      contentContainerStyle={{
        ...contentContainerStyle
      }}
      {...scrollViewProps}
    >
      {children}
    </RNScrollView>
  );
};
