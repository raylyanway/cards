import Animated, {
  AnimatedScrollViewProps,
  useAnimatedRef
} from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useGlobalStore } from '@/store/useGlobalStore';

interface ScrollViewProps extends AnimatedScrollViewProps {
  tabPadding?: boolean;
  themed?: boolean;
  fullScreen?: boolean;
}

export const ScrollView = ({
  children,
  style,
  themed = false,
  tabPadding = false,
  fullScreen = false,
  ...animatedScrollViewProps
}: ScrollViewProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const colors = useGlobalStore((s) => s.computed.colors);
  const bottomTabOverflow = useBottomTabOverflow();
  const tabBarHeight = tabPadding ? bottomTabOverflow : 0;
  const backgroundColor = themed ? colors.background : undefined;
  const flex = fullScreen ? 1 : undefined;

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      style={[{ backgroundColor }, style]}
      contentContainerStyle={{ paddingBottom: tabBarHeight, flex }}
      scrollIndicatorInsets={{ bottom: tabBarHeight }}
      {...animatedScrollViewProps}
    >
      {children}
    </Animated.ScrollView>
  );
};
