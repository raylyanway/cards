import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, { useEvent, useHandler } from 'react-native-reanimated';

import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}

export default function HomeScreen() {
  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      console.log(e.offset, e.position);
    }
  });

  return (
    <TabSafeAreaView fullScreen>
      <AnimatedPager
        testID={'pager-view'}
        style={styles.pagerView}
        initialPage={0}
        onPageScroll={handler}
      >
        <View testID={'1'} key="1">
          <Text>First page</Text>
        </View>
        <View testID={'2'} key="2">
          <Text>Second page</Text>
        </View>
        <View testID={'3'} key="3">
          <Text>Third page</Text>
        </View>
      </AnimatedPager>
    </TabSafeAreaView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1
  }
});
