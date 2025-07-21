import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps
} from 'react-native';

import { useBoundStore } from '@/store/useBoundStore';

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
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const backgroundColor = themed ? colors.background : undefined;
  const contentContainerStyle = fullScreen ? { flexGrow: 1 } : undefined;

  return (
    <RNScrollView
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
