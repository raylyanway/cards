import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface CenterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Center = ({ children, style }: CenterProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});