import { View as RNView, ViewProps } from 'react-native';

import { useGlobalStore } from '@/store/useGlobalStore';

export const View = ({ style, ...props }: ViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  return (
    <RNView
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    />
  );
};