import Animated, {
  AnimatedScrollViewProps,
  useAnimatedRef
} from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useGlobalStore } from '@/store/useGlobalStore';

interface ScrollViewProps extends AnimatedScrollViewProps {
  tabPadding?: boolean;
}

export const ScrollView = ({
  children,
  style,
  tabPadding = true,
  ...animatedScrollViewProps
}: ScrollViewProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const colors = useGlobalStore((s) => s.computed.colors);
  const bottomTabOverflow = useBottomTabOverflow();
  const tabBarHeight = tabPadding ? bottomTabOverflow : 0;

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      style={[{ backgroundColor: colors.background }, style]}
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
      scrollIndicatorInsets={{ bottom: tabBarHeight }}
      {...animatedScrollViewProps}
    >
      {children}
    </Animated.ScrollView>
  );
};
