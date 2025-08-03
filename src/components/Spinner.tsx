import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { green } from '@/styles';
import { SpinnerProps } from '@/types';

export const Spinner = ({
  size = 'large',
  color = green[300],
  visible = true,
}: SpinnerProps) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
