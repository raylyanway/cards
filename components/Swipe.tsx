import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { useBoundStore } from '@/store/useBoundStore';

export interface ISwipeProps {
  children: React.ReactNode;
  onEnd: (params: {
    e: GestureUpdateEvent<PanGestureHandlerEventPayload>;
    swipeDirection: 'left' | 'right';
  }) => void;
  isEnabled?: (swipeDirection: 'left' | 'right') => boolean;
}

export const Swipe: React.FC<ISwipeProps> = ({
  children,
  onEnd,
  isEnabled
}) => {
  const colors = useBoundStore((state) => state.computedTheme.colors);

  const position = useSharedValue(0);
  const opacity = useSharedValue(1);
  const { width } = useWindowDimensions();

  // Distance to trigger disappearance
  const SCREEN_THRESHOLD = width;

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > 10) {
        const swipeDirection = e.translationX > 0 ? 'right' : 'left';

        // Check if swipe direction is enabled
        if (isEnabled && !isEnabled(swipeDirection)) {
          position.value = withTiming(0, { duration: 150 });
          return;
        }

        const targetPosition =
          swipeDirection === 'right' ? SCREEN_THRESHOLD : -SCREEN_THRESHOLD;

        position.value = withTiming(
          targetPosition,
          { duration: 150 },
          (finished) => {
            if (finished) {
              opacity.value = withTiming(0, { duration: 150 }, (finished) => {
                if (finished) {
                  runOnJS(onEnd)({ e, swipeDirection });
                  position.value = -targetPosition;
                  position.value = withTiming(0, { duration: 150 });
                  opacity.value = withTiming(1, { duration: 150 });
                }
              });
            }
          }
        );
      } else {
        position.value = withTiming(0, { duration: 150 });
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    opacity: opacity.value
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.box,
            animatedStyle,
            { backgroundColor: colors.backgroundBlock }
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    height: '100%',
    width: '100%',
    borderRadius: 20
  }
});
