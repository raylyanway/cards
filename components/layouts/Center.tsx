import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps
} from 'react-native';

export const Center = ({ children, style, ...viewProps }: ViewProps) => {
  return (
    <View style={[styles.container, style]} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});
