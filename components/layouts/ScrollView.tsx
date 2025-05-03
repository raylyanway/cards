import Animated, {
    AnimatedScrollViewProps,
    useAnimatedRef
  } from 'react-native-reanimated';
  
  import { useGlobalStore } from '@/store/useGlobalStore';
  
  export const ScrollView = ({
    children,
    style,
    ...props
  }: AnimatedScrollViewProps) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const colors = useGlobalStore((s) => s.computed.colors);
  
    return (
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={[{ backgroundColor: colors.background }, style]}
        {...props}
      >
        {children}
      </Animated.ScrollView>
    );
  };