import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData
} from 'react-native-pager-view';
import PagerView from 'react-native-pager-view';

import { ICard } from '@/types';

interface DefaultItemProps {
  children: React.ReactNode;
  scrollOffsetAnimatedValue: Animated.Value;
}

const DefaultItem = ({
  children,
  scrollOffsetAnimatedValue
}: DefaultItemProps) => {
  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: [0, 0.5, 0.99],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  });

  const scale = scrollOffsetAnimatedValue.interpolate({
    inputRange: [0, 0.5, 0.99],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View
      style={[
        styles.page,
        {
          opacity,
          transform: [{ scale }]
        }
      ]}
      collapsable={false}
    >
      {children}
    </Animated.View>
  );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

interface CarouselProps {
  items: ICard[];
  renderItem: ({
    item,
    index,
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  }: {
    item: ICard;
    index: number;
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
  }) => React.ReactNode;
  onIndexChange: (newIndex: number, direction: 'left' | 'right') => void;
  initialPage?: number;
}

export const Carousel = React.forwardRef(function CarouselInner(
  { items, renderItem, onIndexChange, initialPage = 0 }: CarouselProps,
  ref: React.ForwardedRef<PagerView>
) {
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const onPageSelectedPosition = useRef(new Animated.Value(0)).current;
  const previousPosition = useRef(initialPage);

  return (
    <View style={styles.container}>
      <AnimatedPagerView
        ref={ref}
        initialPage={initialPage}
        style={{ width: '100%', height: '100%' }}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue
              }
            }
          ],
          { useNativeDriver: true }
        )}
        onPageSelected={Animated.event<PagerViewOnPageSelectedEventData>(
          [{ nativeEvent: { position: onPageSelectedPosition } }],
          {
            listener: ({ nativeEvent: { position } }) => {
              const direction =
                position > previousPosition.current ? 'right' : 'left';
              previousPosition.current = position;
              onIndexChange(position, direction);
            },
            useNativeDriver: true
          }
        )}
      >
        {items.map((item, index) => (
          <DefaultItem
            key={item.id}
            scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          >
            {renderItem({
              item,
              index,
              scrollOffsetAnimatedValue,
              positionAnimatedValue
            })}
          </DefaultItem>
        ))}
      </AnimatedPagerView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1
  }
});
