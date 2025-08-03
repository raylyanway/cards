import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export interface ISwipeProps {
  children: React.ReactNode;
  onEnd: (params: {
    e: GestureUpdateEvent<PanGestureHandlerEventPayload>;
    swipeDirection: 'left' | 'right';
  }) => void;
}

export const Swipe: React.FC<ISwipeProps> = ({ children, onEnd }) => {
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationX;
    })
    .onEnd((e) => {
      position.value = withTiming(0, { duration: 100 });
      if (position.value > 10 || position.value < -10) {
        const swipeDirection = e.translationX > 0 ? 'right' : 'left';
        onEnd({ e, swipeDirection });
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }]
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]}>
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
    // backgroundColor: '#b58df1',
    borderRadius: 20
  }
});
