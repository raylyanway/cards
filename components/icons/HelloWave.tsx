import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { ViewProps } from '@/components/layouts/View';
import { Text, TextProps } from '@/components/texts/Text';
import { fontSizes, lineHeights } from '@/config';

interface HelloWaveProps extends AnimatedProps<ViewProps> {
  textProps?: TextProps;
}

export const HelloWave = ({
  textProps,
  ...animatedViewProps
}: HelloWaveProps) => {
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }]
  }));

  return (
    <Animated.View style={animatedStyle} {...animatedViewProps}>
      <Text
        style={{
          fontSize: fontSizes.md,
          lineHeight: lineHeights.md
        }}
        {...textProps}
      >
        👋
      </Text>
    </Animated.View>
  );
};
