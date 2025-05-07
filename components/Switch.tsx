import { Switch as RNSwitch, SwitchProps } from 'react-native';

import { palette } from '@/config';

export const Switch = (switchProps: SwitchProps) => {
  return (
    <RNSwitch
      trackColor={{ false: palette.gray, true: palette.green }}
      thumbColor={palette.white}
      {...switchProps}
    />
  );
};
