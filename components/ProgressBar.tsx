import { Animated, View as RNView } from 'react-native';

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
        backgroundColor: '#eee',
        borderRadius: 5,
        overflow: 'hidden'
      }}
    >
      <Animated.View
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: '#4caf50',
          borderRadius: 5
        }}
      />
    </RNView>
  );
};
