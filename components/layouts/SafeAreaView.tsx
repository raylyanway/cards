import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps
} from 'react-native-safe-area-context';

export const SafeAreaView = ({
  children,
  ...safeAreaViewProps
}: SafeAreaViewProps) => {
  return (
    <RNSafeAreaView edges={['top', 'left', 'right']} {...safeAreaViewProps}>
      {children}
    </RNSafeAreaView>
  );
};
