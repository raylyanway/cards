import React, { useMemo } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { LikeCount } from '@/components/LikeCount';
import { NavigationPanel } from '@/components/NavigationPanel';
import { useNavigationPanel } from '@/components/useNavigationPanel';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

// export function BasicPagerViewExample() {
export default function HomeScreen() {
  const { ref, ...navigationPanel } = useNavigationPanel();

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedPagerView
        {...navigationPanel}
        testID="pager-view"
        ref={ref}
        style={styles.PagerView}
        initialPage={0}
        pageMargin={10}
      >
        {useMemo(
          () =>
            navigationPanel.pages.map((page, index) => (
              <View
                testID="pager-view-content"
                key={page.key}
                style={page.style}
                collapsable={false}
              >
                <LikeCount />
                <Text
                  testID={`pageNumber${index}`}
                >{`page number ${index}`}</Text>
              </View>
            )),
          [navigationPanel.pages]
        )}
      </AnimatedPagerView>
      <NavigationPanel {...navigationPanel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    width: 300,
    height: 200,
    padding: 20
  },
  PagerView: {
    flex: 1
  }
});
