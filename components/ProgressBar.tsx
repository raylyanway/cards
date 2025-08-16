import { Animated, View as RNView } from 'react-native';

import { palette } from '@/config/typography';

type ProgressItem = {
  value: number;
  color: string;
};

export const ProgressBar = ({
  items,
  total
}: {
  items: ProgressItem[];
  total: number;
}) => {
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
      {items.map((item, index) => {
        const progress = total > 0 ? item.value / total : 0;
        const borderRadius = index === items.length - 1 ? 5 : 0;

        return (
          <Animated.View
            key={index}
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              backgroundColor: item.color,
              borderBottomRightRadius: borderRadius,
              borderTopRightRadius: borderRadius
            }}
          />
        );
      })}
    </RNView>
  );
};
