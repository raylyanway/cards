import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export const HapticTab = (bottomTabBarButtonProps: BottomTabBarButtonProps) => {
  return (
    <PlatformPressable
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        bottomTabBarButtonProps.onPressIn?.(ev);
      }}
      {...bottomTabBarButtonProps}
    />
  );
};
