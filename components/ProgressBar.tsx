import { Animated, View as RNView } from 'react-native';

import { palette } from '@/config/typography';

export const ProgressBar = ({
  value,
  total
}: {
  value: number;
  total: number;
}) => {
  const progress = total > 0 ? value / total : 0;
  return (
    <RNView
      style={{
        height: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: palette.white,
        borderRadius: 5,
        overflow: 'hidden'
      }}
    >
      <Animated.View
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: palette.green,
          borderRadius: 5
        }}
      />
    </RNView>
  );
};
