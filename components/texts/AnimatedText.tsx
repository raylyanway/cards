import React, { ReactNode, useEffect } from 'react';
import Animated, {
    AnimatedProps,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';

import { Text, TextProps } from './Text';

const DURATION = 1000;
const DELAY = 0;

interface AnimatedTextProps extends AnimatedProps<TextProps> {
  children: ReactNode;
  show: boolean;
  textProps?: TextProps;
}

export const AnimatedText = ({
  children,
  show,
  textProps,
  ...animatedTextProps
}: AnimatedTextProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (show)
      opacity.value = withDelay(DELAY, withTiming(1, { duration: DURATION }));
    else
      opacity.value = withDelay(DELAY, withTiming(0, { duration: DURATION }));
  }, [opacity, show]);

  return (
    <Animated.Text style={{ opacity: opacity }} {...animatedTextProps}>
      <Text {...textProps}>{children}</Text>
    </Animated.Text>
  );
};