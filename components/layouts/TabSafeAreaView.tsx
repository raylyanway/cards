import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps as RNSafeAreaViewProps
} from 'react-native-safe-area-context';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useBoundStore } from '@/store/useBoundStore';

export interface TabSafeAreaViewProps extends RNSafeAreaViewProps {
  themed?: boolean;
  fullScreen?: boolean;
  tabPadding?: boolean;
}

export const TabSafeAreaView = ({
  children,
  themed = false,
  fullScreen = false,
  tabPadding = false,
  style,
  ...safeAreaViewProps
}: TabSafeAreaViewProps) => {
  const colors = useBoundStore((state) => state.computedTheme.colors);
  const bottomTabOverflow = useBottomTabOverflow();
  const tabBarHeight = tabPadding ? bottomTabOverflow : 0;
  const backgroundColor = themed ? colors.background : undefined;
  const flex = fullScreen ? 1 : undefined;

  return (
    <RNSafeAreaView
      style={[{ backgroundColor, flex, paddingBottom: tabBarHeight }, style]}
      edges={['top', 'left', 'right']}
      {...safeAreaViewProps}
    >
      {children}
    </RNSafeAreaView>
  );
};
