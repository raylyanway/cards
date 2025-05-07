import { View as RNView, ViewProps as RNViewProps } from 'react-native';

import { useGlobalStore } from '@/store/useGlobalStore';

export interface ViewProps extends RNViewProps {
  themed?: boolean;
}

export const View = ({ style, themed = false, ...viewProps }: ViewProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);
  const backgroundColor = themed ? colors.background : undefined;

  return <RNView style={[{ backgroundColor }, style]} {...viewProps} />;
};
