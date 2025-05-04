import Animated, {
  AnimatedScrollViewProps,
  useAnimatedRef
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';


  import { useGlobalStore } from '@/store/useGlobalStore';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
  
  export const ScrollView = ({
    children,
    style,
    ...props
  }: AnimatedScrollViewProps) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const colors = useGlobalStore((s) => s.computed.colors);
    const tabBarHeight = useBottomTabBarHeight();

  
    return (
      <SafeAreaView edges={['top', 'left', 'right']}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={[{ backgroundColor: colors.background }, style]}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        {...props}
      >
        {children}
      </Animated.ScrollView>
      </SafeAreaView>
    );
  };