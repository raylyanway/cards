import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import PagerView from 'react-native-pager-view';

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

interface CarouselProps<T extends { id: string | number }> {
  items: T[];
  renderItem: ({
    item,
    index,
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  }: {
    item: T;
    index: number;
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
  }) => React.ReactNode;
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
  initialPage?: number;
  itemBuffer?: number;
}

export const Carousel = <T extends { id: string | number }>({
  items,
  renderItem,
  initialPage = 0
}: CarouselProps<T>) => {
  const pagerRef = useRef<PagerView>(null);

  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <AnimatedPagerView
        ref={pagerRef}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1
  }
});
