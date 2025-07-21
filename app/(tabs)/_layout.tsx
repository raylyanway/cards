import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/icons/Icon';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useBoundStore } from '@/store/useBoundStore';

export default function TabLayout() {
  const colors = useBoundStore((state) => state.computedTheme.colors);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        })
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon size="md" name="home" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => (
            <Icon size="md" name="card" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon size="md" name="settings" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="lib"
        options={{
          title: 'Lib',
          tabBarIcon: ({ color }) => (
            <Icon size="md" name="paper-plane" color={color} />
          )
        }}
      />
    </Tabs>
  );
}
