import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, {
  AnimatedScrollViewProps,
  useAnimatedRef
} from 'react-native-reanimated';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

import { useGlobalStore } from '@/store/useGlobalStore';

interface ScrollViewProps extends AnimatedScrollViewProps {
  safeAreaProps?: SafeAreaViewProps;
}

export const ScrollView = ({
  children,
  safeAreaProps,
  style,
  ...animatedScrollViewProps
}: ScrollViewProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const colors = useGlobalStore((s) => s.computed.colors);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} {...safeAreaProps}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={[{ backgroundColor: colors.background }, style]}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        {...animatedScrollViewProps}
      >
        {children}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
